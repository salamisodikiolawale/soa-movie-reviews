import app from "../../app";
import request from "supertest";
import mongoose from "mongoose";
import { randomInt } from "crypto";
import { Http_code } from "../../config/http_code";


describe("POST | create user", () => {

  const url:string="/user";
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

  it("returns status code 500 if users not login", async () => {

    //Create first user
    const pwd:string = `iAm${random}@gmail1`;
    const usn:string = `iAm${random}`;
    const em:string = `iAm${random}@gmail.com`;

    const user = {
      password : pwd,
      username: usn,
      email: em
    }

    const response = await request(app)
      .post(`${url}`)
      .send(user);
      
    expect(response.statusCode).toEqual(Http_code.OK);

    //Login user recently created to get auth credentials
    const uri:string="login";
    const userAuth = {
      identifier : em,
      password : pwd
    }

    const response2 = await request(app)
      .post(`${url}/${uri}`)
      .send(userAuth);
  
    expect(response2.statusCode).toEqual(Http_code.OK);

  });

  
});