import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import { Http_code } from "../../config/http_code";

jest.useRealTimers();

describe("GET reviews data", () => {

    const url:string="/api/v1/reviews";

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

        const movieId="63c1d3d71b7cc02cb55145be";

        const response = await request(app).get(`${url}/${movieId}`);

        expect(response.statusCode).toEqual(Http_code.OK);

    })

    it("Returns 404 if data dont exist in database", async () => {

        const movieId="63c1d3d71b7c2cb55145be";

        const response = await request(app).get(`${url}/${movieId}`);

        expect(response.statusCode).toEqual(Http_code.NOTFOUND);

    })
})