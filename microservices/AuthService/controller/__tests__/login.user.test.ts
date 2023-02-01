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
    const rd = random;
    const user = {
      password : `iAm${rd}@gmail1`,
      username:`iAm${rd}`,
      email:`iAm${rd}@gmail.com`
    }

    const response = await request(app)
      .post(`${url}`)
      .send(user);
      
    expect(response.statusCode).toEqual(Http_code.OK);

    //Login user recently created to get auth credentials
    const uri:string="login";
    const userAuth = {
      identifier : user.username,
      password : user.password
    }
    const response2 = await request(app)
      .post(`${url}/${uri}`)
      .send(userAuth);
  
    expect(response2.statusCode).toEqual(Http_code.INTERNALSERVERERROR);

  });

  
});