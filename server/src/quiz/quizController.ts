import { Request, Response, Router } from "express";
import { Quiz } from "./quizModel";
import { QuizQuestion } from "./quizQuestionModel";
import { QuizQuestionOption } from "./questionOptionModel";

export const quizRouter = Router();

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
