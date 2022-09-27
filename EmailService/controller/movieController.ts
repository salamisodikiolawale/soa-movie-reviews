import express from "express";
import {Movie} from "../database/models/Movie";
import MovieTable from "../database/schemas/MovieSchema";

//business logic

export const createMovie = async (request:express.Request, response:express.Response) => {

    //Exceptions
    try {
        //Recuperation des données dans la request
        let movie:Movie = {
            title : request.body.title,
            comment : request.body.comment,
            image : request.body.image,
        };
        //Verify if data already exist in the database
        let existingMovie:Movie|null = await MovieTable.findOne({ title: movie.title});
        if(existingMovie){
            return response.status(401).json({
                msg: 'Movie is already exist'
            });
        }

        //Create the movie into database
        let newMovie = new MovieTable(movie);
        movie = await newMovie.save();
        response.status(200).json({
            msg: 'Movie is created successfully',
            product:movie
        });

    } catch (error){
        console.log(error);
        response.status(500).json({
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

