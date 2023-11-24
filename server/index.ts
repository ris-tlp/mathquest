import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { userRouter } from "./src/user/userController";
import { courseRouter } from "./src/course/courseController";
import { dataInitRouter } from "./src/dataInit/dataInitController";
import { registeredCourseRouter } from "./src/course/registeredCourseController";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));

mongoose.connect(
    `mongodb://${process.env.MONGODB_IP}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`
);

// mongoose.connect(process.env.MONGODB_URI!);

// API endpoints
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/courses/registered", registeredCourseRouter);

// Dev API endpoints
app.use("/api/dev", dataInitRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
