import express from 'express';
import cors from 'cors';
import dotenv  from 'dotenv';
import * as mongoose from "mongoose";
import apiRouter from "./router/apiRouter";
import { URL, URL_TEST } from './config/db';

// Initialisation
const hateoasLinker = require('express-hateoas-links');
const app:express.Application = express();
app.use(express.urlencoded({ extended: true }));

// Configurations
app.use(hateoasLinker);
app.use(cors());
app.use(express.json());


// Env variables
let node_env:string|undefined = process.env.NODE_ENV_Email_Serv_Var;
let mongoDBUrl:string|undefined = process.env.MONGODB_URL;
let mongoDBUrlTest:string|undefined = process.env.MONGODB_URL_TEST;

/**
 * Mongo production database connection
 */
const connectToDBDev = async () => {
    if(URL) {
        mongoose.set('strictQuery', false);
        mongoose.connect(URL)
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
    if(URL_TEST) {
        mongoose.connect(URL_TEST)
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
node_env=="dev" ? connectToDBDev() : connectToDBTest();


app.get("/", async (request:express.Request, response:express.Response) => {
    response.status(200).send({
        "msg": "Welcome to Email send Service"
    })
})

// Routes Configuration
app.use('/api/v1/', apiRouter);

export default app;



