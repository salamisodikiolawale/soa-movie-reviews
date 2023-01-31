import express from "express";
import {Movie} from "../database/models/Movie";
import MovieTable from "../database/schemas/MovieSchema";
import { Http_code } from "../config/http_code";


//business logic

/**
 * GET FILTERED LIST OF MOVIES
 * @param request filter form
 * @param response 
 * @returns 
 */
export const getFilteredListOfMovies = async (request:express.Request, response:express.Response) => {

    //Exceptions
    try {
        //Recuperation des données dans la request
        let requested_movie:Movie = {
            title : request.body.title,
            comment : request.body.comment,
            image : request.body.image,
        };
        //find in database the list of movies
        let list_movies : Movie[] | null = await MovieTable.find({title : requested_movie.title, comment : requested_movie.comment, image : requested_movie.image}).exec();
        if(list_movies == null){
            return response.status(Http_code.NOTFOUND).json({
                msg: 'There are no movies which match the filter',
            });
        }

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

