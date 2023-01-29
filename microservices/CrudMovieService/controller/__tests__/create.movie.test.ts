import app from "../../app";
import request from "supertest";
import mongoose from "mongoose";
import { randomInt } from "crypto";
import Movie from "../../interfaces/movie.interface";
import { Http_code } from "../../config/http_code";


describe("POST | create movie", () => {

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

  it("returns status code 401 if body data of movie don't valid", async () => {


    //Create movie
    const m1:Movie = {
      title : "Infinity Pool"+random,
      date : "2023-01-21",
      rating: 12,
      description: "It almost feels like ticket buyers should have to prove that they’ve seen Brandon Cronenberg’s “Possessor” before being allowed admittance to his newest film, “Infinity Pool.” That way they know what they’re in for. Once again, the increasingly impressive son of David Cronenberg has made a wildly surreal, unapologetic, violent, pornographic movies about privilege, morality, and things I couldn’t possibly begin to explain in a review. Cronenberg takes unbelievably big swings here—maybe even more than his last movie—and he does not bother to hold your hand along the way. He is a fascinating filmmaker, one who I think has not quite yet made his masterpiece, but I’m becoming increasingly convinced he will soon.  ",
      image : "https://s3.amazonaws.com/static.rogerebert.com/uploads/review/primary_image/reviews/infinity-pool-movie-review-2023/infinity-pool-movie-review-2023.jpeg",
    }
    const response = await request(app)
      .post(`${url}`)
      .send(m1);
      
    expect(response.statusCode).toEqual(Http_code.UNAUTHORIZED);
  });

  it("returns status 201 if movie created", async () => {
    
    const m1:Movie = {
      userId : "63cf007b1c92ca13f90ee6fe",
      title : "Infinity Pool"+random,
      date : "2023-01-21",
      rating: 15,
      description: "It almost feels like ticket buyers should have to prove that they’ve seen Brandon Cronenberg’s “Possessor” before being allowed admittance to his newest film, “Infinity Pool.” That way they know what they’re in for. Once again, the increasingly impressive son of David Cronenberg has made a wildly surreal, unapologetic, violent, pornographic movies about privilege, morality, and things I couldn’t possibly begin to explain in a review. Cronenberg takes unbelievably big swings here—maybe even more than his last movie—and he does not bother to hold your hand along the way. He is a fascinating filmmaker, one who I think has not quite yet made his masterpiece, but I’m becoming increasingly convinced he will soon.  ",
      image : "https://s3.amazonaws.com/static.rogerebert.com/uploads/review/primary_image/reviews/infinity-pool-movie-review-2023/infinity-pool-movie-review-2023.jpeg",
    }

    const response = await request(app)
      .post(`${url}`)
      .send(m1);
    expect(response.statusCode).toEqual(Http_code.CREATED);
  });
});