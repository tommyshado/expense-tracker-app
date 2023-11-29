const expenseTracker = (database) => {

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
            const total = expense[1] * expensesVals[expense[2]].days;
            
            // Define values and query then...
            const values = `values ($1, $2, $3, $4)`;
            const query = `insert into expense (expense, amount, total, category_id) ${values}`;
    
            // Create an expense
            await database.none(query, expense.join(total));
        };

    };

    return {
        catagories,
        addExpense
    };
};


export default expenseTracker;