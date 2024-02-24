import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongo_URL = process.env.MONGO_URL;

mongoose.connect(mongo_URL);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDb is connected");
});
db.on("error", () => {
  console.log("database error");
});
export default db;
