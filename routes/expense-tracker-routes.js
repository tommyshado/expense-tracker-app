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

    console.log(catagories);

    // Show the catagories
    res.render("index", {
        availableCatagories: catagories,
    });
});


export default router;