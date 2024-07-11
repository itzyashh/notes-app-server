import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected"))
.catch((error) => console.log(error.message));