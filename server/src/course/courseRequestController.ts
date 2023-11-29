import { Request, Response, Router } from "express";
import { CourseRequest, RequestStatus } from "./courseRequestModel";
import { Course } from "./courseModel";

/// api/courses/requests
export const courseRequestRouter = Router();

courseRequestRouter.get(
    "/getAllRequests",
    async (req: Request, res: Response) => {
        try {
            const courseRequests = await CourseRequest.aggregate([
                {
                    $match: { requestStatus: RequestStatus.PENDING },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "teacherEmail",
                        foreignField: "email",
                        as: "user",
                    },
                },
                {
                    $lookup: {
                        from: "courses",
                        localField: "courseId",
                        foreignField: "_id",
                        as: "course",
                    },
                },
                {
                    $unwind: {
                        path: "$course",
                        preserveNullAndEmptyArrays: true, // preserve documents without matches
                    },
                },
                {
                    $unwind: {
                        path: "$user",
                        preserveNullAndEmptyArrays: true, // preserve documents without matches
                    },
                },
            ]).exec();

            res.status(200)
                .setHeader("Content-Type", "application/json")
                .json({ courseRequests });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);
