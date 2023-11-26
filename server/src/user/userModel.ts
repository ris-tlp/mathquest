import { Schema, Types, model } from "mongoose";

enum UserType {
    TEACHER = "teacher",
    ADMINISTRATOR = "administrator",
    STUDENT = "student",
}

export interface IUser {
    name: string;
    email: string;
    userType: UserType;
    firebaseUid: string;
    image: string;
    // registeredCourses: Array<string>;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: false },
    email: { type: String, required: true },
    userType: {
        type: String,
        enum: Object.values(UserType),
        default: UserType.STUDENT,
    },
    firebaseUid: { type: String, unique: true },
    image: { type: String, unique: true },
    // registeredCourses: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         required: true,
    //         ref: "registeredCourses",
    //     },
    // ],
});

export const User = model<IUser>("User", userSchema);
