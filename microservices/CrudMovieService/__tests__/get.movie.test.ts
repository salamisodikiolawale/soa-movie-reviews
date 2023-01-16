import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import { Http_code } from "../config/http_code";

jest.useRealTimers();

describe("GET the movies data", () => {

    const url:string="/api/v1/movies";

    beforeAll(done => {
        done()
    })

    afterAll(async() => {
        try {
        await mongoose.connection.close();
        } catch (error) {
            console.log(error);
        }
    })

    it("Returns 200 if data exist inn database", async () => {

        const response = await request(app).get(`${url}`);

        expect(response.statusCode).toEqual(Http_code.OK);

    })
})