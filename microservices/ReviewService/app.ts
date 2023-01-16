import express from 'express';
import cors from 'cors';
import dotenv  from 'dotenv';
import * as mongoose from "mongoose";
import apiRouter from "./router/apiRouter";

//Auto decouvrability
//const hateoasLinker = require('express-hateoas-links');


const app:express.Application = express();

//app.use(hateoasLinker);

// Configurations
app.use(cors());
dotenv.config( {path : './.env'}); // for env variable
app.use(express.json()); // json form data

let hostName:string|undefined = process.env.HOST_NAME;
let port:number|undefined = Number(process.env.PORT);
let mongoDBUrl:string|undefined = process.env.MONGODB_URL;



// MongoDB connection

if(mongoDBUrl) {
    mongoose.connect(mongoDBUrl).then( () => {
        console.log('Connecting to mongoDB Successfully ...');
    }).catch( (error) => {
        console.log(error);
        process.exit(1); // Stop the node js process
    });
}

app.get("/", async (request:express.Request, response:express.Response) => {
    response.status(200).send({
        "msg": "Welcome to Review movie Service"
    })
})

// Route Configuration

app.use('/api/v1/', apiRouter);

if(port !== undefined && hostName !== undefined){
    app.listen(port, hostName, () => {
        console.log(`Express Server is running at ${hostName}:${port}`);
    });
}



