import express from 'express';
import {getFilteredListOfMovies} from "../controller/searchController";

const apiRouter:express.Router = express.Router();

/*
    Usage: Return the list of movies which match the filter
    URL : http://searchService:3005/api/v1/search
    Method : GET
    Fields: title, type, ranking , publicationDate
    Access: Public
 */
apiRouter.get('/search',getFilteredListOfMovies);

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
//apiRouter.delete('/search/title/:movieTitle', deleteMovie);
//apiRouter.delete('/search/type/movieType', deleteMovie);

//apiRouter.delete('/movies/:movieId', deleteMovie);

/*
    Usage: Get all the movies
    URL : http://127.0.0.1:3000/api/v1/movies
    Method : GET
    Fields:  name, image, comment
    Access: Public
 */
//apiRouter.get('/movies', getMovies);

/*
    Usage: Get a Single product
    URL : http://127.0.0.1:3000/api/v1/movies/:movieId
    Method : GET
    Fields: name, image, price, qty, info
    Access: Public
 */

//apiRouter.get('/movies/:movieId', getMovie);

export default apiRouter;