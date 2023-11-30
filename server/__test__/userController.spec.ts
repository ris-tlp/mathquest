import request from "supertest";
import { app, server } from "..";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import { User } from "../src/user/userModel";

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

describe("Tests api/users/signup", () => {
    it("should sign up a user", async () => {
        const payload = {
            name: "name",
            email: "newtest@mathquest.com",
            userType: "student",
            image: "http",
        };

        const response = await request(app)
            .post("/api/users/signup")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("result");

        await User.findOne({ email: payload["email"] }).deleteOne().exec();
    });
});

describe("Tests api/users/type", () => {
    it("should get type of a user", async () => {
        const payload = {
            email: "test@mathquest.com",
        };

        const response = await request(app)
            .get("/api/users/type")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("type");
    });
});

describe("Tests api/users/addProfileSkills", () => {
    it("should add a skill to the user", async () => {
        const payload = {
            email: "test@mathquest.com",
            skills: ["skill1"],
        };

        const response = await request(app)
            .post("/api/users/addProfileSkills")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("result");
    });
});

describe("Tests api/users/deleteProfileSkills", () => {
    it("should delete a skill from the user", async () => {
        const payload = {
            email: "test@mathquest.com",
            skills: ["skill1"],
        };

        const response = await request(app)
            .post("/api/users/deleteProfileSkills")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("result");
    });
});

describe("Tests api/users/getAllUsersOfType", () => {
    it("get all users of a specific type", async () => {
        const payload = {
            userType: "student",
        };

        const response = await request(app)
            .post("/api/users/getAllUsersOfType")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("userType");
    });
});
