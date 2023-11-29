const expenseTracker = (database) => {

    const catagories = async () => {
        return await database.manyOrNone("select * from category");
    };

    return {
        catagories,
    };
};


export default expenseTracker;