import request from "supertest";
import { app, server } from "..";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Course } from "../src/course/courseModel";

beforeAll(async () => {
    dotenv.config();
    mongoose.connect(process.env.MONGODB_URI!);
});

afterAll(async () => {
    mongoose.connection.close();
    server.close();
});

describe("Tests api/courses/", () => {
    it("should get the list of courses", async () => {
        const payload = { email: "student@mathquest.com" };
        const response = await request(app)
            .post("/api/courses/")
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

describe("Tests api/courses/teachers/getAllCourses", () => {
    it("should get a list of all courses that a teacher is a creator of", async () => {
        const payload = { email: "emilyjohn@mathquest.edu" };

        const response = await request(app)
            .post("/api/courses/teachers/getAllCourses/")
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

describe("Tests api/courses/teachers/getRegisteredUsers", () => {
    it("should get a list of all users registered in a course", async () => {
        const payload = { courseID: "655fbd485eb88ede085051a7" };

        const response = await request(app)
            .post("/api/courses/teachers/getRegisteredUsers")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        // check property
        expect(response.body).toHaveProperty("userInfo");
        // check non empty array
        expect(response.body["userInfo"].length).not.toBe(0);
    });
});

describe("Tests api/courses/updateCourse", () => {
    it("should update a course's information", async () => {
        const newCourse = await new Course({
            courseName: "new test course",
            email: "email",
        }).save();

        const payload = {
            courseID: newCourse._id,
            course: { courseName: "new test name" },
        };

        const response = await request(app)
            .post("/api/courses/updateCourse")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("updatedCourse");
        expect(response.body["updatedCourse"]["courseName"]).toBe(
            "new test name"
        );

        await Course.find({ _id: newCourse._id }).deleteOne().exec();
    });
});

describe("Tests api/courses/hideCourse", () => {
    it("shoud unpublish a course", async () => {
        const newCourse = await new Course({
            courseName: "new test course",
            email: "email",
            isPublished: true,
        }).save();

        const payload = {
            courseID: newCourse._id,
        };

        const response = await request(app)
            .post("/api/courses/hideCourse")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("result");
        expect(response.body["result"]["isPublished"]).toBe(false);

        await Course.find({ _id: newCourse._id }).deleteOne().exec();
    });
});

describe("Tests api/courses/filterCoursesByStatus", () => {
    it("Should filter courses on the basis of their request status", async () => {
        const payload = {
            requiredStatus: "pending",
        };

        const response = await request(app)
            .post("/api/courses/filterCoursesByStatus")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("filteredCourses");
    });
});

describe("Tests api/courses/changeRequestStatus", () => {
    it("Should change the status of a course", async () => {
        const newCourse = await new Course({
            courseName: "new test course",
            email: "email",
            isPublished: false,
            requestStatus: "pending",
        }).save();

        const payload = {
            courseID: newCourse._id,
            newStatus: "accepted",
        };

        const response = await request(app)
            .post("/api/courses/changeRequestStatus")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("results");
        expect(response.body["results"]["requestStatus"]).toBe("accepted");

        await Course.find({ _id: newCourse._id }).deleteOne().exec();
    });
});
