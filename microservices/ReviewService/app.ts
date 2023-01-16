// Modules importation
import express from 'express';
import cors from 'cors';
import dotenv  from 'dotenv';
import * as mongoose from "mongoose";
import apiRouter from "./router/apiRouter";
import { Db } from './config/db';
//Initialisations
const app:express.Application = express();
const hateoasLinker = require('express-hateoas-links');//Auto decouvrability

// Configurations
app.use(cors());
app.use(hateoasLinker);
app.use(express.json());

// Get variables env values
let node_env:string|undefined = process.env.NODE_ENV_Rev_Serv_Var;
let mongoDBUrl:string|undefined = process.env.MONGODB_URL;
let mongoDBUrlTest:string|undefined = process.env.MONGODB_URL_TEST;



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

       throw new Error("Env variable it not define[DEV]");
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
        throw new Error("Env variable it not define [TEST]");
    }
}

// Connexion on database dev or test depending environnement
// node_env=="dev" ? connectToDBDev() : connectToDBTest();
connectToDBDev();

app.get("/", async (request:express.Request, response:express.Response) => {
    response.status(200).send({
        "msg": "Welcome to Review movie Service"
    })
})

// Route Configuration
app.use('/api/v1/', apiRouter);

export default app;


