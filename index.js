import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import routes from "./router/router.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000;
const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MongoUrl);
    console.log("success");
  } catch (error) {
    throw error;
  }
};

app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
  mongoConnect();
  console.log("connected at "+PORT);
});