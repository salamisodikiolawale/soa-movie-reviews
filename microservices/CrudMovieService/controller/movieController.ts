import axios from "axios";
import express from "express";
import {Movie} from "../database/models/Movie";
import MovieTable from "../database/schemas/MovieSchema";
import {validationResult } from 'express-validator';

export const createMovie = async (request:express.Request, response:express.Response) => {

    // Error section validation
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(401).json({ errors: errors.array() });
    }

    try {
        //Recuperation des données dans la request
        let movie:Movie = {
            title : request.body.title,
            date : request.body.date,
            ranting: request.body.ranting,
            description: request.body.description,
            image : request.body.image,
            types : request.body.types
        };

        //Decov
        const _link = [

            { rel: "self", href: 'http://127.0.0.1' },
            {
                rel: "create",
                method: "POST",
                title: 'Create movie',
                href: '/movies',
                data: {
                    "title" : "text",
                    "date" : "date",
                    "ranting": "number",
                    "description": "texte",
                    "image" : "texte",
                    "types" : "[]"
                }
            },
            {
                rel: "movie",
                method: "GET",
                title: 'Get movie',
                href: '/movies/:id',
            }
        ]

        //Create the movie into database
        let newMovie = new MovieTable(movie);
        movie = await newMovie.save();
        response.status(200).json({
            msg: 'Movie is created successfully',
            movie:movie,
            _link
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

            { rel: "self", href: 'http://127.0.0.1/api/v1' },
            {
                rel: "create",
                method: "POST",
                title: 'Create movie',
                href: '/movies',
                data: {
                    "title" : "text",
                    "date" : "date",
                    "ranting": "number",
                    "description": "texte",
                    "image" : "texte",
                    "types" : "[]"
                }
            },
            {
                rel: "movie",
                method: "GET",
                title: 'Get movie',
                href: '/movies/:id',
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

export const getMovie = async (request:express.Request, response:express.Response) => {

    try {

        const movieId = request.params.movieId;

        let movies:Movie|null|any = await MovieTable.findById(movieId);

        // Send request -> review service
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Host": "review_service.localhost"
            }
        };

        let reviews = {}
        
    
        //Send request to review  service for get reviews movie
        reviews = await axios.get(`${process.env.REVIEW_SERVICE}`+movieId, axiosConfig).then( (resp) => {
                
                return resp.data.list_review;
        });

        const _link = [

            { rel: "self", href: 'http://127.0.0.1/api/v1' },
            {
                rel: "create",
                method: "POST",
                title: 'Create movie',
                href: '/movies',
                data: {
                    "title" : "text",
                    "date" : "date",
                    "ranting": "number",
                    "description": "texte",
                    "image" : "texte",
                    "types" : "[]"
                }
            },
            {
                rel: "movie",
                method: "GET",
                title: 'Get movie',
                href: '/movies/:id',
            }
        ]
        response.status(200).json({
            movies,
            reviews,
            _link
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error : error
        })
    }

}

export const getFiveLasteMovies = async (request:express.Request, response:express.Response) => {

    
    try {

        

        let numberOfMovie:number = Number(request.params.numberOfMovie);

        let movies:Movie[]|null = await MovieTable.find().sort('-createdAt').limit(numberOfMovie);

        const _link = [

            { rel: "self", href: 'http://127.0.0.1/api/v1' },
            {
                rel: "create",
                method: "POST",
                title: 'Create movie',
                href: '/movies',
                data: {
                    "title" : "text",
                    "date" : "date",
                    "ranting": "number",
                    "description": "texte",
                    "image" : "texte",
                    "types" : "[]"
                }
            },
            {
                rel: "movie",
                method: "GET",
                title: 'Get movie',
                href: '/movies/:id',
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


export const deleteMovie = async(request:express.Request, response:express.Response) => {

    let {movieId} = request.params;
    try {
        let movie:Movie|null = await MovieTable.findById(movieId);
        if(!movie){
            return response.status(404).json({
                msg : 'Movie is not found !'
            });
        }

        movie= await MovieTable.findByIdAndRemove(movieId);

        //Decov
        const _link = [

            { rel: "self", href: 'http://127.0.0.1' },
            {
                rel: "All movies",
                method: "GET",
                title: 'Get movies',
                href: '/movies',
            },
            {
                rel: "create",
                method: "POST",
                title: 'Create movie',
                href: '/movies',
                data: {
                    "title" : "text",
                    "date" : "date",
                    "ranting": "number",
                    "description": "texte",
                    "image" : "texte",
                    "types" : "[]"

                }
            }
        ]

        response.status(200).json({
            msg: `Movie ${movieId} is deleted`,
            movie:movie,
            _link
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error
        })
    }
}

export const updateMovie = async(request:express.Request, response:express.Response) => {

    //Get id into request params
    let {movieId} = request.params

    //Management Exception
    try {
        let updatedMovie:Movie = {
            title : request.body.title,
            image : request.body.image,
            date : request.body.date,
            ranting : request.body.ranting,
            description : request.body.description,
            types : request.body.types
        };

        //Check if movie is already exist into database
        let existingMoviewillUpdated:Movie|null = await MovieTable.findById(movieId);
        if(!existingMoviewillUpdated){
            return response.status(404).json({
                msg : 'Movie is not exists'
            });
        }

        //update product
        existingMoviewillUpdated = await MovieTable.findByIdAndUpdate(movieId, {
            $set : {
                title : updatedMovie.title ? updatedMovie.title : existingMoviewillUpdated.title,
                image : updatedMovie.image ? updatedMovie.image : existingMoviewillUpdated.image,
                date : updatedMovie.date ? updatedMovie.date : existingMoviewillUpdated.date,
                ranting : updatedMovie.ranting ? updatedMovie.ranting : existingMoviewillUpdated.ranting,
                description : updatedMovie.description ? updatedMovie.description : existingMoviewillUpdated.description,
                types : updatedMovie.types ? updatedMovie.types : existingMoviewillUpdated.types,

            }
        }, { new : true });

        //Decov
        const _link = [

            { rel: "self", href: 'http://127.0.0.1' },
            {
                rel: "All movies",
                method: "GET",
                title: 'Get movies',
                href: '/movies',
            },
            {
                rel: "create",
                method: "POST",
                title: 'Create movie',
                href: '/movies',
                data: {
                    "title" : "text",
                    "date" : "date",
                    "ranting": "number",
                    "description": "texte",
                    "image" : "texte",
                    "types" : "[]"
                }
            },
            {
                rel: "movie",
                method: "GET",
                title: 'Get movie',
                href: '/movies/:id',
            }
        ]
        response.status(201).json({
            msg: 'Movie is Updated',
            movie: existingMoviewillUpdated,
            _link
        });

    } catch (error) {
        console.log(error);
        // @ts-ignore
        if(error.kind === 'ObjectId'){
            return response.status(404).json({
                msg : 'Movie is not exists'
            });
        }
        response.status(500).json({
            error : error
        });
    }
}


