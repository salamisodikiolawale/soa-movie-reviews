import express from 'express';
import cors from 'cors';
import dotenv  from 'dotenv';
import * as mongoose from "mongoose";
import userRouter from "./router/userRouter";
import { Db } from './config/db';
import { Http_code } from './config/http_code';

//Auto decouvrability
const hateoasLinker = require('express-hateoas-links');


const app:express.Application = express();

app.use(hateoasLinker);

// Get variables env values
dotenv.config( {path : './.env'});
let node_env:string|undefined = process.env.NODE_ENV_AUTH_Serv_Var;
let frontUrl:string|undefined = process.env.FRONTEND;
let mongoDBUrl:string|undefined = process.env.MONGODB_URL;
let mongoDBUrlTest:string|undefined = process.env.MONGODB_URL_TEST;


// Configurations
const corsOptions ={
    origin:`${frontUrl}`, 
    credentials:true,//access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));  
app.use(hateoasLinker);
app.use(express.json()); // json form data

/**
 * Mongo production database connection
 */
const connectToDBDev = async () => {
    if(Db.URL) {
        mongoose.connect(Db.URL)
        .then( () => {
            console.log('Connecting to mongoDB Successfully ...');
        }).catch( (error) => {
            console.log(error);
            // Stop the node js process
            process.exit(1); 
        });
    } else {

        throw new Error("Env variable it not define");
    }
}

/**
 * Mongo test database connection
 */
const connectToDBTest = async () => {
    if(mongoDBUrlTest) {
        mongoose.connect(mongoDBUrlTest)
        .then( () => {
            console.log('Connecting to mongoDB of test Successfully ...');
        })
        .catch( (error) => {
            console.log(error);
            process.exit(1);
        });
    } else {
        throw new Error("Env variable it not define");
    }
}

// Connexion on database dev or test depending environnement
node_env=="dev" ? connectToDBDev() : connectToDBDev();

app.get("/validationAuth", async (request:express.Request, response:express.Response) => {
    response.status(Http_code.OK).send("auth OK!");
})

app.get("/", async (request:express.Request, response:express.Response) => {
    response.status(Http_code.OK).send("Welcome to AuthService !")
})

// Route Configuration

app.use('/user', userRouter);

export default app;



