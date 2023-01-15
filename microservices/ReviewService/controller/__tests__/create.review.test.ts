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

    it("Returns 200 if reviem of mivie created", async () => {

        const movieId="63c1d3d71b7cc02cb55145be";
        const review = {
            movieReviewId : movieId,
            username : "username",
            rating : 2,
            comment : "My comment",
        }

        const response = await request(app).post(`${url}`).send(review);

        expect(response.statusCode).toEqual(Http_code.OK);

    })

    it("Returns 404 if id of mivie dont", async () => {

        const movieId="63c1d3d71b7dddcc02cb55145be";
        const review = {
            movieReviewId : movieId,
            username : "username",
            rating : 2,
            comment : "My comment",
        }

        const response = await request(app).post(`${url}`).send(review);

        
        expect(response.statusCode).toEqual(Http_code.NOTFOUND);

    })
})