import express from "express";
import MovieTable from "../database/schemas/MovieSchema";
import { FilterForm } from "../database/models/FilterForm";
import { Http_code } from "../config/http_code";


//business logic

/**
 * GET FILTERED LIST OF MOVIES
 * @param request filter form
 * @param response json of movies
 * @returns 
 */
export const getFilteredListOfMovies = async (request:express.Request, response:express.Response) => {

    //Exceptions
    try {
        //Get the form from the request
        console.log("getFilteredListOfMovies start");
        let request_form : FilterForm = {
            title : request.body.title,
            type : request.body.type,
            ranking : request.body.ranking,
            publicationDate : request.body.publicationDate
        };

        console.log(request_form);

        let list_movies = null;

        //for each line of the form, we get the movies from the database and add it to the list
        if(request_form.title != null){
            list_movies = await MovieTable.find({title: request_form.title}).exec();
            console.log(list_movies);
        }
        if(request_form.type != null){
            list_movies = await MovieTable.find({types: request_form.type}).exec();
            console.log(list_movies);
        }
        if(request_form.ranking != null){
            let query = {rating: {$gte: request_form.ranking}};// get all the movies with a rating greater than the one in the form
            list_movies = await MovieTable.find(query).exec();
            console.log(list_movies);

        }
        if(request_form.publicationDate != null){
            list_movies = await MovieTable.find({date: request_form.publicationDate}).exec();
            console.log(list_movies);

        }

        //check if the list is null
        if(list_movies == null){
            return response.status(Http_code.NOTFOUND).json({
                msg: 'There are no movies which match the filter',
            });
        }
        //remove the duplicate thanks to their id in the list
        list_movies = list_movies.filter((movie, index, self) =>
            index === self.findIndex((m) => (
                m._id === movie._id
            ))
        )

        //build the response
        response.status(Http_code.OK).json({
            msg: 'List of movies which match the filter',
            list_movies
        });
    } catch (error){
        console.log(error);
        response.status(Http_code.INTERNALSERVERERROR).json({
            error : error
        });
    };
}

