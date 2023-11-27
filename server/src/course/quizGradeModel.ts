import { Schema, Types, model } from "mongoose";

interface IQuizGrade {
    userID: string;
    quizID: Types.ObjectId;
    score: number;
}

const quizGradeSchema = new Schema<IQuizGrade>({
    userID: { type: String, required: true },
    quizID: { type: Schema.Types.ObjectId, required: true, ref: "Quiz" },
    score: { type: Number, required: true },
});

export const QuizGrade = model<IQuizGrade>("QuizGrade", quizGradeSchema);
