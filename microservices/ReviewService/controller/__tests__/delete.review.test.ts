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

    it("Returns 404 if data dont exist inn database", async () => {

        const movieId= "wwwwwwwwwwww";

        const response = await request(app).delete(`${url}/${movieId}`);

        expect(response.statusCode).toEqual(Http_code.NOTFOUND);

    });

    it("Returns 200 if review of movie created", async () => {
        
        const movieId="63c1d3d71b7cc02cb55145be";
        const review = {
            movieReviewId : movieId,
            username : "username",
            rating : 2,
            comment : "My comment",
        }

        const response = await request(app).post(`${url}`).send(review);

        const movieReviewIdDel = response.body.product._id.toString();

        const responseDel = await request(app).delete(`${url}/${movieReviewIdDel}`);

        expect(response.statusCode).toEqual(Http_code.OK);
    })
})