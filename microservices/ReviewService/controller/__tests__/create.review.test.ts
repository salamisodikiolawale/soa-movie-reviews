import { randomInt } from "crypto";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import { Http_code } from "../../config/http_code";
import { Review } from "../../interfaces/review.interface";

jest.useRealTimers();

describe("Create reviews data", () => {

    const urlReview:string="/api/v1/reviews";
    
    const random = randomInt(50000);
  
    beforeAll( done => {
        done();
    })

    afterAll(async() => {
      try {
        await mongoose.disconnect();
      } catch (error) {
        console.log(error);
      }
    })

    it("Returns 200 if review of movie created", async () => {
        
            
        const movieCreatedId:string = "63daa344057da7ec38d93d4d";
        
        // Create review
        let review : Review = {
            movieReviewId : movieCreatedId,
            username : "Name"+random,
            rating : randomInt(1, 5),
            comment : "Comment"+random,
        };

        const reviewCreatedResponse = await request(app)
        .post(`${urlReview}`)
        .send(review);

        expect(reviewCreatedResponse.statusCode).toEqual(Http_code.OK);

    })

    it("Returns 404 if id of movie dont", async () => {

        const movieId="wwwwwwwwwwww";
        const review = {
            movieReviewId : movieId,
            username : "username",
            rating : 2,
            comment : "My comment",
        }

        const response = await request(app).post(`${urlReview}`).send(review);

        
        expect(response.statusCode).toEqual(Http_code.NOTFOUND);

    })
})