import { Request, Response, Router } from "express";
import { RegisteredCourse } from "./registeredCourseModel";
import { User } from "../user/userModel";
import { Course } from "./courseModel";
export const registeredCourseRouter = Router();

// Get all registered courses
registeredCourseRouter.post("/", async (req: Request, res: Response) => {
    try {
        const email = req.body.email;

        let queryResult = await RegisteredCourse.find({
            email: email,
        })
            .select("courses")
            .exec();

        queryResult = await Course.find({
            _id: { $in: [...queryResult[0].courses] },
        });

        console.log("query result", queryResult);

        res.status(200).json({ courses: queryResult });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Register user in a specific course
registeredCourseRouter.post("/new", async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const courseId = req.body.courseId;

        const user = await User.findOne({ email: email })
            .select("email")
            .exec();

        const queryResult = await RegisteredCourse.findOne({
            email: user?.email,
        }).exec();

        // Add course to array if already in db
        if (queryResult) {
            await RegisteredCourse.updateOne(
                { email: queryResult.email },
                { $addToSet: { courses: courseId } }
            ).exec();
            res.status(201).json({ result: "User registered" });
        } else {
            const newRegisteration = await new RegisteredCourse({
                email: user?.email,
                courses: [courseId],
            }).save();
            res.status(201).json({ result: newRegisteration });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
