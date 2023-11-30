import request from "supertest";
import { app, server } from "..";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import { Course } from "../src/course/courseModel";
import { RegisteredCourse } from "../src/course/registeredCourseModel";

beforeAll(async () => {
    server.close();
    await mongoose.connection.close();
    dotenv.config();
    await mongoose.connect(process.env.MONGODB_URI!);
    server.listen(process.env.PORT);
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
});

describe("Tests /api/courses/registered", () => {
    it("should get the list of courses a user is registered in", async () => {
        const payload = { email: "ashwini@mathquest.com" };

        const response = await request(app)
            .post("/api/courses/registered/")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        // check property
        expect(response.body).toHaveProperty("courses");
        // check non empty array
        expect(response.body["courses"].length).not.toBe(0);
    });
});

describe("Tests /api/courses/registered/new", () => {
    it("should register user in a new course", async () => {
        const newCourse = await new Course({
            courseName: "new test course for registering",
            email: "email",
        }).save();

        const payload = {
            email: "test@mathquest.com",
            courseId: newCourse._id,
        };

        const response = await request(app)
            .post("/api/courses/registered/new")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(201);
        // check property
        expect(response.body).toHaveProperty("result");

        await Course.find({ _id: newCourse._id }).deleteOne().exec();
        await RegisteredCourse.find({ _id: response.body["result"]["_id"] })
            .deleteOne()
            .exec();
    });
});
