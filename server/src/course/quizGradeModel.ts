// Import necessary components from the mongoose library
import { Schema, Types, model } from "mongoose";

// Define an interface for the QuizGrade document
interface IQuizGrade {
    email: string;
    quizID: Types.ObjectId;
    score: number;
}

// Create a Mongoose schema for the QuizGrade document based on the defined interface
const quizGradeSchema = new Schema<IQuizGrade>({
    email: { type: String, required: true },
    quizID: { type: Schema.Types.ObjectId, required: true, ref: "Quiz" },
    score: { type: Number, required: true },
});

// Create a Mongoose model named "QuizGrade" based on the defined schema
export const QuizGrade = model<IQuizGrade>("QuizGrade", quizGradeSchema);
