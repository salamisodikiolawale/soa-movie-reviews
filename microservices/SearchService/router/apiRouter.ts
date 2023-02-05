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

export default apiRouter;