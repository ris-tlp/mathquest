import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
var bodyParser = require("body-parser");

import { userRouter } from "./src/user/userController";
import { courseRouter } from "./src/course/courseController";
import { registeredCourseRouter } from "./src/course/registeredCourseController";
import { discussionRouter } from "./src/discussion/discussionController";
import { quizRouter } from "./src/quiz/quizController";
import { gradeRouter } from "./src/course/gradeController";

dotenv.config();
export const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// mongoose.connect(
//     `mongodb://${process.env.MONGODB_IP}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`
// );

mongoose.connect(process.env.MONGODB_URI!);

// API endpoints
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/courses/registered", registeredCourseRouter);
app.use("/api/courses/discussions/", discussionRouter);
app.use("/api/courses/quizzes", quizRouter);
app.use("/api/courses/quizzes/grades", gradeRouter);

export const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
