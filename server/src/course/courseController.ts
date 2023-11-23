import { Request, Response, Router } from "express";
import { Course } from "./courseModel";

export const courseRouter = Router();

// List of all available published courses
courseRouter.get("/", async (req: Request, res: Response) => {
    try {
        const queryResult = await Course.find({
            isPublished: true,
        })
            .select("-isPublished -__v -_id")
            .exec();
        res.status(200).json({ courses: queryResult });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Create a course
courseRouter.post("/", async (req: Request, res: Response) => {
    try {
        const details = req.body;
        const course = new Course(details);

        try {
            await course.save();
            res.status(201).json({
                result: "Course has been created.",
                course: course,
            });
        } catch (error) {
            res.status(400).json({ error: "Invalid request body." });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get a course by CourseName
courseRouter.get("/:courseName", async (req: Request, res: Response) => {
    try {
        const params = req.params;

        const queryResult = await Course.findOne({
            courseName: params["courseName"],
        })
            .select("-isPublished -__v")
            .exec();

        if (!queryResult) {
            res.status(404).json({
                error: "Course not found.",
            });
        } else {
            res.status(200).json({
                queryResult,
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update a course by CourseId
courseRouter.put("/:courseId", async (req: Request, res: Response) => {
    try {
        const params = req.params;
        const body = req.body;

        const filter = { _id: params["courseId"] };
        const update = { ...body };

        try {
            const queryResult = await Course.findOneAndUpdate(filter, update, {
                new: true,
            });

            res.status(200).json({
                result: "Course updated.",
                newCourse: queryResult,
            });
        } catch (error) {
            res.status(404).json({
                error: "Document not found by the courseId specified.",
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
