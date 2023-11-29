import assert from "assert";
import expenseTracker from "../services/expense-tracker-app.js";
import pgPromise from "pg-promise";

// TODO configure this to work.
const DB_URL =
    process.env.TEST_URL ||
    "postgres://ukcuuvlz:6O4FAGBy6BI7DBm0eo46FKnsb_un-GZN@cornelius.db.elephantsql.com/ukcuuvlz";

const config = {
    connectionString: DB_URL,
};

const pgp = pgPromise();
const db = pgp(config);

describe("The Expense Tracker", function () {
    this.timeout(10000);

    const ExpenseTracker = expenseTracker(db);

    beforeEach(async function () {
        await db.none("truncate table expense restart identity cascade");
    });

    it("should be able to get all the available catagories", async () => {
        const catagories = await ExpenseTracker.catagories();

        assert.deepEqual(
            [
                {
                    category_type: "weekly",
                    id: 1,
                },
                {
                    category_type: "monthly",
                    id: 2,
                },
                {
                    category_type: "weekday",
                    id: 3,
                },
                {
                    category_type: "weekend",
                    id: 4,
                },
                {
                    category_type: "once-off",
                    id: 5,
                },
                {
                    category_type: "daily",
                    id: 6,
                },
            ],
            catagories
        );
    });
});
