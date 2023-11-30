import { Request, Response, Router } from "express";
import { Course } from "./courseModel";
import { RegisteredCourse } from "./registeredCourseModel";
import path from "path";
import { User } from "../user/userModel";

// Define a router for handling course-related API endpoints
/// api/courses
export const courseRouter = Router();

// API endpoint to get a list of all available published courses
courseRouter.post("/", async (req: Request, res: Response) => {
    try {
        const userEmail = req.body.email;

        // Retrieve all published courses from the database
        const allPublishedCourses = await Course.find({
            isPublished: true,
        }).exec();

        const allRegisteredCourses = await RegisteredCourse.findOne({
            email: userEmail,
        })
            .select("courses")
            .exec();

        // Initialize an array to store finalized course information
        var finalizedCourses: JSON[] = [];

        // Iterate through each published course
        for (let i = 0; i < allPublishedCourses.length; i++) {
            let publishedCourse = JSON.stringify(allPublishedCourses[i]);
            let publishedCourseJson = JSON.parse(publishedCourse);

            // Check if the user is registered for the course and update the 'isRegistered' field
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

            // Retrieve courses created by the teacher from the database
            const teacherCourses = await Course.find({ email: email }).exec();

            // Check if teacherCourses exist and send the courses as a JSON response
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
            // Handle any errors and send a 500 Internal Server Error response
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

// API endpoint to get registered users for a specific course
courseRouter.post(
    "/teachers/getRegisteredUsers/",
    async (req: Request, res: Response) => {
        try {
            // Extract the course ID from the request body
            const courseID = req.body.courseID;

            // Find registered users for the specified course
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
            // Handle any errors and send a 500 Internal Server Error response
            res.status(500).json({ error: "Internal Server Error" });
            console.log(error);
        }
    }
);

// API endpoint to update a course
courseRouter.post("/updateCourse", async (req: Request, res: Response) => {
    try {
        // Extract course details and ID from the request body
        const course = req.body.course;
        const courseID = req.body.courseID;

        // Update the course in the database and retrieve the updated course
        const updatedCourse = await Course.findByIdAndUpdate(courseID, course, {
            new: true,
        }).exec();

        // Send the updated course as a JSON response
        res.status(200)
            .setHeader("Content-Type", "application/json")
            .json({ updatedCourse });
    } catch (error) {
        // Handle any errors and send a 500 Internal Server Error response
        res.status(500).json({ error: "Internal Server Error " });
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

// API endpoint to hide a course from all published courses
courseRouter.post("/hideCourse", async (req: Request, res: Response) => {
    try {
        const courseID = req.body.courseID;

        const updatedCourse = await Course.findByIdAndUpdate(
            courseID,
            { isPublished: false },
            { new: true }
        ).exec();

        res.status(200)
            .setHeader("Content-Type", "application/json")
            .json({ result: updatedCourse });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Define a route to filter courses based on their request status
courseRouter.post(
    "/filterCoursesByStatus",
    async (req: Request, res: Response) => {
        try {
            const requiredStatus = req.body.requiredStatus;

            const filteredCourses = await Course.find({
                requestStatus: requiredStatus,
            }).exec();

            res.status(200).json({ filteredCourses });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

// Define a route to change the request status of a course
courseRouter.post(
    "/changeRequestStatus",
    async (req: Request, res: Response) => {
        try {
            const courseID = req.body.courseID;
            const newStatus = req.body.newStatus;

            const updatedStatus = await Course.findByIdAndUpdate(
                courseID,
                { requestStatus: newStatus },
                { new: true }
            ).exec();

            if (newStatus === "accepted") {
                const publishCourse = await Course.findByIdAndUpdate(
                    courseID,
                    { isPublished: true },
                    { new: true }
                ).exec();

                res.status(200).json({
                    results: publishCourse,
                });
            } else {
                res.status(200).json({ result: updatedStatus });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);
