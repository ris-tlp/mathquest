import { Request, Response, Router } from "express";
import { RegisteredCourse } from "./registeredCourseModel";
import { User } from "../user/userModel";

export const registeredCourseRouter = Router();

// Get all registered courses
registeredCourseRouter.post("/", async (req: Request, res: Response) => {
    try {
        const firebaseUid = req.body["firebaseUid"];

        // Get corresponding mongo uid for firebase uid
        const userId = await User.findOne({ firebaseUid: firebaseUid })
            .select("_id")
            .exec();

        const queryResult = await RegisteredCourse.find({
            student: userId,
        })
            .select("courses")
            .populate("courses")
            .exec();
        console.log(queryResult);
        res.status(200).json(queryResult);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
