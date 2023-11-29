import { Request, Response, Router } from "express";
import { Course } from "./courseModel";
import { RegisteredCourse } from "./registeredCourseModel";
import path from "path";
import { User } from "../user/userModel";

/// api/courses
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

// Get all courses that a teacher is the creator of
courseRouter.post(
    "/teachers/getAllCourses/",
    async (req: Request, res: Response) => {
        try {
            const email = req.body.email;

            const teacherCourses = await Course.find({ email: email }).exec();

            if (teacherCourses) {
                res.status(200)
                    .setHeader("Content-Type", "application/json")
                    .json({ courses: teacherCourses });
            } else {
                res.status(404)
                    .setHeader("Content-Type", "application/json")
                    .json({ courses: {} });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

courseRouter.post(
    "/teachers/getRegisteredUsers/",
    async (req: Request, res: Response) => {
        try {
            const courseID = req.body.courseID;

            const registeredUsers = await RegisteredCourse.find({
                courses: {
                    $in: [courseID],
                },
            })
                .select("email -_id")
                .exec();

            // Unpack from [{id1,id2}] to [id1, id2]
            let unpackedRegisteredIds = registeredUsers.map((e) =>
                e.email.toString()
            );

            const userInfo = await User.find({
                email: { $in: unpackedRegisteredIds },
            })
                .select("name email image")
                .exec();

            res.status(200).json({ userInfo });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            console.log(error);
        }
    }
);

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
