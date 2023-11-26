import { Request, Response, Router } from "express";
import { Course } from "./courseModel";
import { RegisteredCourse } from "./registeredCourseModel";

export const courseRouter = Router();

// List of all available published courses
courseRouter.post("/", async (req: Request, res: Response) => {
    try {
        const userEmail = req.body.email;
        console.log(userEmail);
        const allPublishedCourses = await Course.find({
            isPublished: true,
        }).exec();

        const allRegisteredCourses = await RegisteredCourse.findOne({
            email: userEmail,
        })
            .select("courses")
            .exec();

        var finalizedCourses: JSON[] = [];

        for (let i = 0; i < allPublishedCourses.length; i++) {
            let publishedCourse = JSON.stringify(allPublishedCourses[i]);
            let publishedCourseJson = JSON.parse(publishedCourse);

            if (
                allRegisteredCourses != null &&
                allRegisteredCourses!["courses"].includes(
                    publishedCourseJson["_id"]
                )
            ) {
                publishedCourseJson["isRegistered"] = true;
            } else {
                publishedCourseJson["isRegistered"] = false;
            }

            finalizedCourses.push(publishedCourseJson);
        }

        res.status(200).json({ courses: finalizedCourses });
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

// Get a course by courseID
courseRouter.get("/getCourseByID", async (req: Request, res: Response) => {
    try {
        const courseID = req.query.courseID;

        const queryResult = await Course.findOne({
            _id: courseID,
        })
            .select("-isPublished -__v")
            .exec();

        if (!queryResult) {
            res.status(404).json({
                error: "Course not found.",
            });
        } else {
            res.status(200).json({
                course: queryResult,
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update a course by CourseId
// courseRouter.put("/:courseId", async (req: Request, res: Response) => {
//     try {
//         const params = req.params;
//         const body = req.body;

//         const filter = { _id: params["courseId"] };
//         const update = { ...body };

//         try {
//             const queryResult = await Course.findOneAndUpdate(filter, update, {
//                 new: true,
//             });

//             res.status(200).json({
//                 result: "Course updated.",
//                 newCourse: queryResult,
//             });
//         } catch (error) {
//             res.status(404).json({
//                 error: "Document not found by the courseId specified.",
//             });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
