import { Request, Response, Router } from "express";
import { Quiz } from "./quizModel";
import { QuizQuestion } from "./quizQuestionModel";
import { QuizQuestionOption } from "./questionOptionModel";
import mongoose from "mongoose";
import { QuizGrade } from "../course/quizGradeModel";

// /api/courses/quizzes
export const quizRouter = Router();

// Will be used for displaying a list of quizzes for a specific course
quizRouter.post("/getAllQuizzes", async (req: Request, res: Response) => {
    try {
        const courseID = req.body.courseID; // used for fetching quizzes
        let email: String = ""; // used for seeing if attempted

        // keeping it backward compatible
        if (req.body.hasOwnProperty("email")) {
            email = req.body.email;
        }

        const queryResult = await Quiz.find({
            courseID: courseID,
        }).exec();

        let quizzesTakenIds = null;
        let quizzesGrade = null;

        // Get all quizzes that have already been attempted
        if (email) {
            const quizzesTaken = await QuizGrade.find({
                email: email,
            })
                .select("quizID score -_id")
                .exec();

            // Unpack to array of string ids
            quizzesTakenIds = quizzesTaken.map((e) => e.quizID.toString());
            quizzesGrade = quizzesTaken.map((e) => e.score.toString());
        }

        if (queryResult) {
            let finalizedQuizzes = [];

            for (let i = 0; i < queryResult.length; i++) {
                let quiz = JSON.stringify(queryResult[i]);
                let quizJson = JSON.parse(quiz);

                const numberOfQuestions = await QuizQuestion.countDocuments({
                    quizID: queryResult[i]._id,
                }).exec();

                quizJson.numberOfQuestions = numberOfQuestions;

                if (quizzesTakenIds) {
                    // Check if the graded quizzes id array contains the current quiz id
                    if (quizzesTakenIds.includes(quizJson._id)) {
                        quizJson.hasAttempted = true;
                        quizJson.grade = quizzesGrade![i];
                    } else {
                        quizJson.hasAttempted = false;
                    }
                }

                finalizedQuizzes.push(quizJson);
            }

            res.status(200)
                .setHeader("Content-Type", "application/json")
                .json({ result: finalizedQuizzes });
        }
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
                {
                    $project: {
                        points: 1,
                        questionType: 1,
                        quizID: 1,
                        question: 1,
                        "options._id": 1,
                        "options.content": 1,
                        "options.questionID": 1,
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

// Used for creating a new quiz question along with its options
quizRouter.post("/createQuestion", async (req: Request, res: Response) => {
    try {
        const question = req.body.question;
        const options: Array<Object> = req.body.options;

        const questionObj = await new QuizQuestion(question).save();

        for (let i = 0; i < options.length; i++) {
            const optionObj = await new QuizQuestionOption(options[i]).save();
        }

        res.status(201).setHeader("Content-Type", "application/json").json({
            newQuestion: questionObj._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// User for creating a quiz without the questions, just the parameters like duration and due date
quizRouter.post("/createQuiz", async (req: Request, res: Response) => {
    try {
        const quiz = req.body.quiz;
        const quizObj = await new Quiz(quiz).save();

        res.status(201).setHeader("Content-Type", "application/json").json({
            newQuiz: quizObj._id,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
