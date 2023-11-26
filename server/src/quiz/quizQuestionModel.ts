import { Schema, Types, model } from "mongoose";

enum QuestionType {
    MCQ = "mcq",
    multipleSelect = "multipleselect",
    truthy = "truthy",
}

export interface IQuestion {
    points: number;
    questionType: QuestionType;
    quizID: Types.ObjectId;
    question: string;
}

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

export const QuizQuestion = model<IQuestion>("QuizQuestion", questionSchema);
