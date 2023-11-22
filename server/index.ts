import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { userRouter } from "./src/user/userController";
import { courseRouter } from "./src/course/courseController";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));

mongoose.connect(
    `mongodb://${process.env.MONGODB_IP}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`
);

// API endpoints
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
