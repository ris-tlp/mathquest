import { Request, Response, Router } from "express";
import { QuizGrade } from "./quizGradeModel";
import { QuizQuestionOption } from "../quiz/questionOptionModel";
import { QuizQuestion } from "../quiz/quizQuestionModel";

// /api/courses/quizzes/grades
export const gradeRouter = Router();

// gradeRouter.post("/gradeQuiz ");

gradeRouter.post("/gradeQuiz", async (req: Request, res: Response) => {
    try {
        const quizID = req.body.quizID;
        const email = req.body.email;

        console.log(req.body);

        /*  in the form of 
        [
            {
                questionID: id
                optionSelectedID: id
            }
        ]
        */

        const answers = req.body.answers;
        let totalPoints = 0;

        // Check if the answer is correct for each question
        for (let i = 0; i < answers.length; i++) {
            // Get the option by its id to check if the selected option is correct
            const optionInformation = await QuizQuestionOption.findOne({
                _id: answers[i].optionSelectedID,
            })
                .select("isCorrect questionID")
                .exec();

            // If it is correct, get the points of the question and add it to total points
            if (optionInformation?.isCorrect) {
                const points = await QuizQuestion.findOne({
                    _id: optionInformation.questionID,
                })
                    .select("points")
                    .exec();

                totalPoints += points!.points;
            }
        }

        console.log("total Points", totalPoints);
        const gradedQuiz = new QuizGrade({
            email: email,
            quizID: quizID,
            score: totalPoints,
        });

        await gradedQuiz.save();

        res.status(201).json({ score: totalPoints });
    } catch (error) {
        res.status(500);
    }
});
