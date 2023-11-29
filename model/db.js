import pgPromise from "pg-promise";
import 'dotenv/config';

const connectString = process.env.LOGIC_URL;

const database = pgPromise()(connectString);
database.connect();

export default database;