import { Router } from "express";
import database from "../model/db.js";

// Service import
import expenseTracker from "../services/expense-tracker-app.js";

// Lodash import
import _ from "lodash";

// Instances
const trackerExpense = expenseTracker(database);
const router = Router();

// Create a route to GET all the catagories
router.get("/", async (req, res) => {
    // Get catagories and...
    const catagories = await trackerExpense.catagories();

    // Get expenses category
    const expensesCategory = await trackerExpense.allExpenses();
    

    let overallTotal = 1;

    expensesCategory.forEach((record) => {
        overallTotal += Number(record.total);
    });

    // Show the catagories
    res.render("index", {
        availableCatagories: catagories,
        categories: expensesCategory,
        grandTotal: overallTotal
    });
});

router.post("/expense/add", async (req, res) => {
    const { description, category, amount  } = req.body;

    const addExpense = {
        expense: description,
        amount: amount,
        catagoryId: category
    };

    // Check if all values are truthy then...
    const checkExpense = _.every(addExpense, Boolean);

    if (checkExpense) {
        // add an expense
        await trackerExpense.addExpense(addExpense);

        // Flash a message to the UI
        req.flash("success", `${addExpense.expense} expense added successfully.`);

        // Redirect to the home route
        res.redirect("/");
        return;
    };

    // Otherwise flash an error message
    if (!checkExpense) {
        req.flash("error", "Expense not added successfully.");
        res.redirect("/");
        return;
    };

});


// Create a route to display expenses summary per category
router.get("/", async (req, res) => {
  

    res.render("index", {
        categories: category
    });
});


export default router;