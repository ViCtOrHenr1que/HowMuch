import mongoose from "mongoose";

mongoose.connect(process.env.DATABASE_CONNECTION);

let DB = mongoose.connection;

export default DB;
