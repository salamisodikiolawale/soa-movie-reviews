import { randomInt } from "crypto";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import { Http_code } from "../../config/http_code";
import { Review } from "../../interfaces/review.interface";

jest.useRealTimers();

describe("GET reviews data", () => {

    const url:string="/api/v1/reviews";
    const random = randomInt(10000);

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



    it("Returns 200 deleted", async () => {
        
        const movieCreatedId:string = "63cc583c48a24ce2ef723f1e";


        const reviews = await request(app)
        .get(`${url}/${movieCreatedId}`);
        
        let olderLength:number = reviews.body.list_review.length;
        
        expect(reviews.statusCode).toEqual(Http_code.OK);

        // Create review
        let review : Review = {
            movieReviewId : movieCreatedId,
            username : "Name"+random,
            rating : randomInt(1, 5),
            comment : "Comment"+random,
        };

        const reviewCreatedResponse = await request(app)
        .post(`${url}`)
        .send(review);

        expect(reviewCreatedResponse.statusCode).toEqual(Http_code.OK);



        const reviews2 = await request(app)
        .get(`${url}/${movieCreatedId}`);

        olderLength = olderLength + 1;
        const newlength = reviews2.body.list_review.length;
        expect(olderLength).toEqual(newlength);
        
        const movieReviewIdDel = reviewCreatedResponse.body.review._id.toString();

        const responseDel = await request(app).delete(`${url}/${movieReviewIdDel}`);

        expect(reviewCreatedResponse.statusCode).toEqual(Http_code.OK);
    })
})