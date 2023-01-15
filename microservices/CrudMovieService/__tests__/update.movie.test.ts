import app from "../app";
import request from "supertest";
import mongoose from "mongoose";
import { Http_code } from "../config/http_code";

describe("PUT movie", () => {

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

    it("Returns 404 if movie don't exist in database", async () => {

        const movieId:mongoose.Types.ObjectId =  new mongoose.Types.ObjectId();

        const response = await request(app).put(`${url}/${movieId}`);

        expect(response.statusCode).toEqual(Http_code.NOTFOUND);
    });

    it("Returns 200 if movie update success", async () => {

        const movieId:string = "6334ad58dbf7f85a270ea5e6";

        const response = await request(app)
                                .put(`${url}/${movieId}`)
                                .send({
                                    title : "First War movie 2024",
                                    date : "2022-01-05T00:00:00.000Z",
                                    rating : 12,
                                    description : "The first descriptionthe WAR",
                                });
        
        expect(response.statusCode).toEqual(Http_code.OK);
    })
})