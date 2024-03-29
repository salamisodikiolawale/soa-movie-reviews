import express from 'express';
import {createMovie, getMovie, getMovies, getFiveLasteMovies} from "../controller/movieController";
import { movieCreateValidation } from '../validations/movieValidations';

const apiRouter:express.Router = express.Router();

/*
    Usage: Create a movie
    URL : http://crudMovieService:3010/api/v1/movies
    Method : POST
    Fields: {
        title: string, require, 
        date:  string, not require, 
        rating: number, not require,
        type:  [string], not require
        description:string, require 
        image: require, string
    }
    Access: Public
 */
apiRouter.post('/movies',movieCreateValidation, createMovie);

/*
    Usage: Update a Movie
    URL : http://127.0.0.1:3000/api/v1/movies/:movieId
    Method : PUT
    Fields: title, date, country, type[string], review:number,  description:string, image
    Access: Public
 */
// apiRouter.put('/movies/:movieId', updateMovie);

/*
    Usage: Delete a Movie
    URL : http://127.0.0.1:3000/api/v1/movies/:movieId
    Method : DELETE
    Fields: name, image, comment
    Access: Public
 */
// apiRouter.delete('/movies/:movieId', deleteMovie);

/*
    Usage: Get all the movies
    URL : http://127.0.0.1:3000/api/v1/movies
    Method : GET
    Fields:  null
    Access: Public
 */
apiRouter.get('/movies', getMovies);

/**
 *  Usage : Get last five movies
 *  URL : http://127.0.0.1:3000/api/v1/movies/:numberOfMovie
 *  Method : GET
 *  Params : numberOfMovie
 *  Access : Public
 */
apiRouter.get('/movies/:numberOfMovie', getFiveLasteMovies)

/**
 *  Usage : Get  movies of user
 *  URL : http://crudMovieService:3010/api/v1/movies/user/:userId
 *  Method : GET
 *  Params : numberOfMovie
 *  Access : Public
 */
// apiRouter.get('/movies/user/:userId', getMoviesOfUser);

/*
    Usage: Get a Single product
    URL : http://127.0.0.1:3000/api/v1/movies/:movieId
    Method : GET
    Fields: name, image, price, qty, info
    Access: Public
 */

apiRouter.get('/movies/movie/:movieId', getMovie);


export default apiRouter;