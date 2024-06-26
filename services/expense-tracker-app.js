const expenseTracker = (database) => {


    // Retrieving everything in the category table
    const catagories = async () => {
        return await database.manyOrNone("select * from category");
    };

    // Define a function called, addExpense which takes in an object with catagory id, amount and expense
    const addExpense = async (data) => {
        // Store expenses data
        const expense = [
            data.expense,
            data.amount,
            data.catagoryId
        ];

        /*
            key 1 represents "weekly"
            key 2 represents "monthly"
            key 3 represents "weekday"
            key 4 represents "weekend"
            key 5 represents "once-of"
            key 6 represents "daily"
        */
        const expensesVals = {
            1: {
                days: 4
            },
            2: {
                days: 30
            },
            3: {
                days: 5
            },
            4: {
                days: 2
            },
            5: {
                days: 1
            },
            6: {
                days: 1
            },
        };

        // Check if expense catagory equals to expenseVals key
        if (expensesVals[expense[2]]) {
            
            // Calculate total then...
            const total = Number(expense[1]) * expensesVals[expense[2]].days;
            
            // Define values and query then...
            const values = `values ($1, $2, $3, $4)`;
            const query = `insert into expense (expense, amount, total, category_id) ${values}`;

            expense.splice(2, 0, total);
    
            // Create an expense
            await database.none(query, expense);
        };
    };

    const allExpenses = async () => {
        // Join category and expense using foreign keys then...
        const join = `inner join category on expense.id = category.id`;
        const query = `select * from expense ${join}`;

        // Get the results
        return database.manyOrNone(query);
    };

    const categoryTotals = () => {
        // Join expense and category using foreign keys then...
        const join = `inner join expense on category.id = expense.id`;
        const query = `select category_type, SUM(total) AS total from category ${join} group by category_type`;

        // Get the results
        return database.manyOrNone(query);
    };

    const expensesForCategory = async (categoryId) => {
        // Filter data from the  expense where category_id is equal to [categoryId]
        return await database.manyOrNone("select * from expense where category_id = $1", [categoryId]);
    };

    const deleteExpense = async (expenseId) => {
        // Delete everything from expense where id equal [expenseId]
        return await database.none("delete from expense where id = $1", [expenseId]);
    };

    return {
        catagories,
        addExpense,
        allExpenses,
        categoryTotals,
        expensesForCategory,
        deleteExpense,
    };
};


export default expenseTracker;