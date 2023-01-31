import express from "express";
import {Movie} from "../database/models/Movie";
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
        let request_form : FilterForm = {
            title : request.body.title,
            type : request.body.type,
            ranking : request.body.ranking,
            publicationDate : request.body.publicationDate
        };

        let list_movies = null;

        //for each line of the form, we get the movies from the database
        if(request_form.title != null){
            list_movies = await MovieTable.find({title : request_form.title}).exec();
        }
        if(request_form.type != null){
            list_movies = await MovieTable.find({type : request_form.type}).exec();
        }
        if(request_form.ranking != null){
            list_movies = await MovieTable.find({ranking : request_form.ranking}).exec();
        }
        if(request_form.publicationDate != null){
            list_movies = await MovieTable.find({publicationDate : request_form.publicationDate}).exec();
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
            list_movies,
            datas: {
                "_links": {
                    "review": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/${review._id}` },
                    "reviews": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/${review.movieReviewId}` },
                    "movies": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies` },
                    "movie": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies/${review.movieReviewId}` },
                },
                "_embedded": {},
            },

        });
    } catch (error){
        console.log(error);
        response.status(Http_code.INTERNALSERVERERROR).json({
            error : error
        });
    };
}

export const getMovies = async (request:express.Request, response:express.Response) => {

    try {
        let movies:Movie[]|null = await MovieTable.find();

        const _link = [

            { rel: "self", href: 'http://127.0.0.1' },
            {
                rel: "create",
                method: "POST",
                title: 'Create movie',
                href: '/movies',
                data: {
                    "title": "text",
                    "comment": "text",
                    "image": "text",
                    "date": "date"
                }
            },
            {
                rel: "lists",
                method: "GET",
                title: 'Get movies  ',
                href: '/movies',
            }
        ]
        response.status(200).json({
            movies,
            _link
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error : error
        })
    }

}

