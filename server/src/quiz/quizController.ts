import { Request, Response, Router } from "express";
import { Quiz } from "./quizModel";
import { QuizQuestion } from "./quizQuestionModel";
import { QuizQuestionOption } from "./questionOptionModel";
import mongoose from "mongoose";

export const quizRouter = Router();

// Will be used for displaying a list of quizzes for a specific course
quizRouter.post("/getAllQuizzes", async (req: Request, res: Response) => {
    try {
        const courseID = req.body.courseID;

        const queryResult = await Quiz.find({
            courseID: courseID,
        }).exec();

        res.status(200)
            .setHeader("Content-Type", "application/json")
            .json({ result: queryResult });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Will be used to get the questions and options along with info of a specific quiz
quizRouter.post("/getQuiz", async (req: Request, res: Response) => {
    try {
        const quizID = req.body.quizID;

        try {
            let qID = new mongoose.Types.ObjectId(quizID);
            const questions = await QuizQuestion.aggregate([
                { $match: { quizID: qID } },
                {
                    $lookup: {
                        from: "quizquestionoptions",
                        localField: "_id",
                        foreignField: "questionID",
                        as: "options",
                    },
                },
            ]).exec();
            res.status(200)
                .setHeader("Content-Type", "application/json")
                .json({ questions });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "Incorrect quiz id." });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
