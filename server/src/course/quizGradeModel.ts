import { Schema, Types, model } from "mongoose";

interface IQuizGrade {
    email: string;
    quizID: Types.ObjectId;
    score: number;
}

const quizGradeSchema = new Schema<IQuizGrade>({
    email: { type: String, required: true },
    quizID: { type: Schema.Types.ObjectId, required: true, ref: "Quiz" },
    score: { type: Number, required: true },
});

export const QuizGrade = model<IQuizGrade>("QuizGrade", quizGradeSchema);
