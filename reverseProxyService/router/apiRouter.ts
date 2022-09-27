import express from 'express';
import {createMovie, getMovies} from "../controller/movieController";

const apiRouter:express.Router = express.Router();

/*
    Usage: Create a movie
    URL : http://crudMovieService:3000/api/v1/movies
    Method : POST
    Fields: name, image, comment
    Access: Public
 */
apiRouter.post('/movies', createMovie);

/*
    Usage: Update a Movie
    URL : http://127.0.0.1:3000/api/v1/movies/:movieId
    Method : PUT
    Fields: name, image, comment
    Access: Public
 */
//apiRouter.put('/movies/:movieId', updateMovie);

/*
    Usage: Delete a Movie
    URL : http://127.0.0.1:3000/api/v1/movies/:movieId
    Method : DELETE
    Fields: name, image, comment
    Access: Public
 */
//apiRouter.delete('/movies/:movieId', deleteMovie);

/*
    Usage: Get all the movies
    URL : http://127.0.0.1:3000/api/v1/movies
    Method : GET
    Fields:  name, image, comment
    Access: Public
 */
apiRouter.get('/movies', getMovies);

/*
    Usage: Get a Single product
    URL : http://127.0.0.1:3000/api/v1/movies/:movieId
    Method : GET
    Fields: name, image, price, qty, info
    Access: Public
 */

//apiRouter.get('/movies/:movieId', getMovie);

export default apiRouter;