import app from "../app";
import request from "supertest";
import mongoose from "mongoose";
import { Http_code } from "../config/http_code";


describe("POST | create movie", () => {

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

  it("returns status code 401 if body data of movie don't valid", async () => {
    const response = await request(app)
      .post(`${url}`)
      .send({ 
        title: "First titl2",
        description: "The first description",
        date: "2022-01-05T00:00:00.000Z",
      });
      
    expect(response.statusCode).toEqual(Http_code.UNAUTHORIZED);
  });

  it("returns status 201 if movie created", async () => {
    const response = await request(app)
      .post(`${url}`)
      .send({
        title: "Test",
        date: "2022-01-05T00:00:00.000Z",
        rating: 2,
        description: "The first description",
      });
    expect(response.statusCode).toEqual(Http_code.CREATED);
  });

  
  /*
  //Gerer le require=true et décommenter
  it("returns status 500 Bad request if database schema don't respected", async () => {
    const response = await request(app)
    .post(`${url}`)
    .send({
      title: "First title",
      rating: 2,
      description: "The first description"
    });
    expect(response.statusCode).toEqual(Http_code.INTERNALSERVERERROR);
  });*/
});