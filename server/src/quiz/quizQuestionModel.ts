// Import necessary modules from mongoose library
import { Schema, Types, model } from "mongoose";

// Define an enumeration for different question types
enum QuestionType {
    MCQ = "mcq",
    multipleSelect = "multipleselect",
    truthy = "truthy",
}

// Define the structure of a question using an interface
export interface IQuestion {
    points: number;
    questionType: QuestionType;
    quizID: Types.ObjectId;
    question: string;
}

// Create a Mongoose schema for the question
const questionSchema = new Schema<IQuestion>(
    {
        points: { type: Number, required: true },
        questionType: {
            type: String,
            enum: Object.values(QuestionType),
        },
        quizID: { type: Schema.Types.ObjectId, ref: "Quiz" },
        question: { type: String, required: true },
    },
    { timestamps: true }
);

// Create a Mongoose model for the question using the schema
export const QuizQuestion = model<IQuestion>("QuizQuestion", questionSchema);
