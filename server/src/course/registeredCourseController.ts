import { Request, Response, Router } from "express";
import { RegisteredCourse } from "./registeredCourseModel";
import { User } from "../user/userModel";
import { Course } from "./courseModel";

// api/courses/registered
export const registeredCourseRouter = Router();

// Get all registered courses
registeredCourseRouter.get("/", async (req: Request, res: Response) => {
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
        res.status(200).json(queryResult);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Register user in a specific course
registeredCourseRouter.post("/new", async (req: Request, res: Response) => {
    try {
        const firebaseUid = req.body["firebaseUid"];
        const courseName = req.body["courseName"];
        const courseDescription = req.body["courseDescription"];

        const userId = await User.findOne({ firebaseUid: firebaseUid })
            .select("_id")
            .exec();

        // Need a better way to query a course
        const courseId = await Course.findOne({
            courseName: courseName,
            courseDescription: courseDescription,
        })
            .select("_id")
            .exec();

        const queryResult = await RegisteredCourse.exists({
            student: userId,
        }).exec();

        // Add course to array if already in db
        if (queryResult) {
            RegisteredCourse.updateOne(
                { _id: queryResult["_id"] },
                { $addToSet: { courses: courseId } }
            ).exec();
        } else {
            const newRegisteration = new RegisteredCourse({
                student: userId,
                courses: [],
            });
        }

        res.status(200).json({});
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
