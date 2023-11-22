import { Schema, Types, model } from "mongoose";

interface IModule {
    moduleName: string;
    moduleContent: string;
    moduleNumber: number;
    courseId: Types.ObjectId;
}

const moduleSchema = new Schema<IModule>({
    moduleName: { type: String, required: true },
    moduleContent: { type: String, required: true },
    moduleNumber: { type: Number, required: true },
    courseId: { type: Schema.Types.ObjectId, required: true },
});

export const Module = model<IModule>("Module", moduleSchema);
