import app from "../../app";
import request from "supertest";
import mongoose from "mongoose";
import { randomInt } from "crypto";
import { Http_code } from "../../config/http_code";


describe("POST | create user", () => {

  const url:string="/user";
  const random = randomInt(50000);

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

  it("returns status code 200 user create", async () => {


    //Create user
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
  });

  it("returns status code 401 error during create user", async () => {


    //Create user one
    const rd = random;
    const user = {
      password : `iAm${rd}@gmail1`,
      username:`iAm${rd}`,
    }

    const response = await request(app)
      .post(`${url}`)
      .send(user);
      
    expect(response.statusCode).toEqual(Http_code.UNAUTHORIZED);
  });

  it("return 401 if user identifie existed", async () => {

    //Create first user
    const rd = random;
    const user = {
      password : `iA${rd}@gmail1`,
      username:`iA${rd}`,
      email:`iA${rd}@gmail.com`
    }

    const response = await request(app)
      .post(`${url}`)
      .send(user);
      
    expect(response.statusCode).toEqual(Http_code.OK);

    //Create second user with the same username of first user created recently
    const user2 = {
      password : `iAm${rd}@gmail1`,
      username:`iAm${rd}`,
      email:`iAm${rd}@gmail.com`
    }

    const response2 = await request(app)
      .post(`${url}`)
      .send(user2);
      
    expect(response2.statusCode).toEqual(Http_code.UNAUTHORIZED);
  })

});