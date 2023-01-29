import { randomInt } from "crypto";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import { Http_code } from "../../config/http_code";
import Movie from "../../interfaces/movie.interface";

jest.useRealTimers();

describe("GET the movies data", () => {

    const url:string="/api/v1/movies";
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

    it("Returns 200 if movies exist in database", async () => {

        const response = await request(app).get(`${url}`);

        expect(response.statusCode).toEqual(Http_code.OK);

    })

    it("Returns 200 if data movie exist in database", async () => {
        //Create movie
        const m1:Movie = {
            userId : "63cf007b1c92ca13f90ee6fe",
            title : "Infinity Pool"+random,
            date : "2023-01-21",
            rating: 12,
            description: "It almost feels like ticket buyers should have to prove that they’ve seen Brandon Cronenberg’s “Possessor” before being allowed admittance to his newest film, “Infinity Pool.” That way they know what they’re in for. Once again, the increasingly impressive son of David Cronenberg has made a wildly surreal, unapologetic, violent, pornographic movies about privilege, morality, and things I couldn’t possibly begin to explain in a review. Cronenberg takes unbelievably big swings here—maybe even more than his last movie—and he does not bother to hold your hand along the way. He is a fascinating filmmaker, one who I think has not quite yet made his masterpiece, but I’m becoming increasingly convinced he will soon.  ",
            image : "https://s3.amazonaws.com/static.rogerebert.com/uploads/review/primary_image/reviews/infinity-pool-movie-review-2023/infinity-pool-movie-review-2023.jpeg",
        };
        const movieCreated = await request(app)
        .post(`${url}`)
        .send(m1);

        const movieId = movieCreated.body.movie._id;
        
        // Get movie with id mmovie created now
        const response = await request(app)
            .get(`${url}/movie/${movieId}`);
        
        expect(response.statusCode).toEqual(Http_code.OK);
    })
})