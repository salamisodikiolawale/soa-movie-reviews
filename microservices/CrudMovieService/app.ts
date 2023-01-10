
import express from 'express';
import cors from 'cors';
import dotenv  from 'dotenv';
import * as mongoose from "mongoose";
import apiRouter from "./router/apiRouter";


const app:express.Application = express();

//Auto decouvrability
const hateoasLinker = require('express-hateoas-links');



app.use(express.urlencoded({
    extended: true
  }));
  
app.use(hateoasLinker);

// Configurations
app.use(cors());
dotenv.config( {path : './.env'}); // for env variable
app.use(express.json()); // json form data

let node_env:string|undefined = process.env.NODE_ENV;

let mongoDBUrl:string|undefined = process.env.MONGODB_URL;


const connectToDBDev = async () => {
    // MongoDB connection
    if(mongoDBUrl) {
        // mongoose.disconnect();
        mongoose.connect(mongoDBUrl)
        .then( () => {
            console.log('Connecting to mongoDB Successfully ...');
        }).catch( (error) => {
            console.log(error);
            process.exit(1); // Stop the node js process
        });
    }
}

const connectToDBTest = async () => {
    mongoose.connect("mongodb://mongo-test-db:27017/movie")
    .then( () => {
        console.log('Connecting to mongoDB of test Successfully ...');
    })
    .catch( (error) => {
        console.log(error);
        process.exit(1);
    });
}

/**
 * Connexion on database dev or test depending environnement
 */
// node_env=="dev" ? connectToDBDev() : connectToDBTest();
connectToDBDev()



app.get('/', async (request:express.Request, response:express.Response) => {
    response.status(200).send("Hello World!");
})

// Route Configuration

app.use('/api/v1/', apiRouter);

export default app;


