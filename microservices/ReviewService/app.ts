import express from 'express';
import cors from 'cors';
import dotenv  from 'dotenv';
import * as mongoose from "mongoose";
import apiRouter from "./router/apiRouter";
import { Http_code } from './config/http_code';
import { URL, URL_TEST } from './config/db';

//Initialisations
const app:express.Application = express();
const hateoasLinker = require('express-hateoas-links');//Auto decouvrability

// Get variables env values
dotenv.config( {path : './.env'});
let frontUrl:string|undefined = process.env.FRONTEND;
let node_env:string|undefined = process.env.NODE_ENV_Rev_Serv_Var;
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
app.use(express.json());




/**
* Mongo production database connection
*/
const connectToDBDev = async () => {
   if(URL) {
       mongoose.connect(URL)
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
        throw new Error("Env variable it not define [TEST]");
    }
}

// Connexion on database dev or test depending environnement
node_env=="dev" ? connectToDBDev() : connectToDBTest();

app.get("/", async (request:express.Request, response:express.Response) => {
    response.status(Http_code.OK).send({
        "msg": "Welcome to REVIEW SERVICE"
    })
})

app.use('/api/v1/', apiRouter);

export default app;


