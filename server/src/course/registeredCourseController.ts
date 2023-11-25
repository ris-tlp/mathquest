import { Request, Response, Router } from "express";
import { RegisteredCourse } from "./registeredCourseModel";
import { User } from "../user/userModel";
import { Course } from "./courseModel";

// api/courses/registered
export const registeredCourseRouter = Router();

// Get all registered courses
registeredCourseRouter.post("/", async (req: Request, res: Response) => {
    try {
        const email = req.body.email;

        console.log("in here");
        let queryResult = await RegisteredCourse.find({
            email: email,
        })
            .select("courses")

            .exec();

        console.log(queryResult);
        queryResult = await Course.find({
            _id: { $in: [...queryResult[0].courses] },
        });

        res.status(200)
            .setHeader("Content-Type", "application/json")
            .json({ courses: queryResult });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Register user in a specific course
registeredCourseRouter.post("/new", async (req: Request, res: Response) => {
    try {
        const email = req.body["email"];
        const courseId = req.body["courseId"];
        // const courseDescription = req.body["courseDescription"];

        const user = await User.findOne({ email: email })
            .select("email")
            .exec();

        const queryResult = await RegisteredCourse.findOne({
            email: user?.email,
        }).exec();

        // Add course to array if already in db
        if (queryResult) {
            RegisteredCourse.updateOne(
                { email: queryResult.email },
                { $addToSet: { courses: courseId } }
            ).exec();
        } else {
            const newRegisteration = new RegisteredCourse({
                email: user?.email,
                courses: [],
            });
        }

        res.status(200).json({});
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
