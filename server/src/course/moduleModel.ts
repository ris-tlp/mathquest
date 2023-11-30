// Importing necessary elements from the "mongoose" library
import { Schema, Types, model } from "mongoose";

// Defining the interface for the module, specifying its properties and types
interface IModule {
    moduleName: string;
    moduleContent: string;
    moduleNumber: number;
    courseId: Types.ObjectId;
}

// Creating a Mongoose schema for the module using the defined interface
const moduleSchema = new Schema<IModule>({
    moduleName: { type: String, required: true },
    moduleContent: { type: String, required: true },
    moduleNumber: { type: Number, required: true },
    courseId: { type: Schema.Types.ObjectId, required: true },
});

// Creating a Mongoose schema for the module using the defined interface
export const Module = model<IModule>("Module", moduleSchema);
