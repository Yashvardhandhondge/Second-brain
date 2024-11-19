import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./Routes/signup"; // Ensure the correct import path

dotenv.config();
const app = express();
app.use(express.json());
app.use('/user', router); // This is how you use the router in Express

const Mongo = process.env.MONGO_URL;

async function main() {
  try {
    const connected = await mongoose.connect(Mongo || "");
    console.log(connected ? "Connected to MongoDB" : "Not connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
