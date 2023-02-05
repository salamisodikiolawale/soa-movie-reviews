// Modules importation
import axios from "axios";
import express from "express";
import {Movie} from "../database/models/Movie";
import MovieTable from "../database/schemas/MovieSchema";
import {validationResult } from 'express-validator';
import { Http_code } from "../config/http_code";


/**
 * CREATE MOVIE
 * @param request movie data
 * @param response 
 * @returns code http and movie created
 */
export const createMovie = async (request:express.Request, response:express.Response) => {
    
    // Manage Error section validation
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(401).json({ errors: errors.array() });
    }

    try {
        
        // Get data into request enter
        let movie:Movie = {
            userId: request.body.userId,
            title : request.body.title,
            date : request.body.date,
            rating: request.body.rating,
            description: request.body.description,
            image : request.body.image || "",
            types : request.body.types || []
        };


        let createdIdMovie:string|null|undefined=null;

        let newMovie = new MovieTable(movie);
        movie = await newMovie.save();

        createdIdMovie=movie._id;

        response.status(Http_code.CREATED).json({
            msg: 'Movie is created successfully',
            movie:movie,
            datas: {
                "_links": {
                    "movies": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies` },
                    "movie": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies/${createdIdMovie}` },
                    "reviews": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/${createdIdMovie}` },
                    "item": []
                },
                "_embedded": {}
            }
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

        response.status(Http_code.OK).json({
            movies,
            datas: {
                "_links": {
                    "movies": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies` },
                    "movie": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies/:movieId` },
                    "reviews": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/:movieId` },
                    "item": []
                },
                "_embedded": {}
            }
        });
    } catch (error) {
        console.log(error);
        response.status(Http_code.INTERNALSERVERERROR).json({
            error : error
        })
    }

}

export const getMovie = async (request:express.Request, response:express.Response) => {

    try {

        const movieId = request.params.movieId;

        let movie:Movie|null|any = await MovieTable.findById(movieId);

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
        reviews = await axios.get(`${process.env.REVIEW_SERVICE_CRUD_Serv_Var}`+movieId, axiosConfig).then( (resp) => {
                
                return resp.data.list_review;
        })
        .catch(error => console.log(`reviews of movie ${movieId} dont exist`));

        
        response.status(Http_code.OK).json({
            movie,
            datas: {
                "_links": {
                    "reviews": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/${movie._id}` },
                    "movies": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies` },
                    "movie": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies/${movie._id}` },
                },
                "_embedded": {
                    reviews
                }
            }
        });
    } catch (error) {
        console.log(error);
        response.status(Http_code.NOTFOUND).json({
            error : error
        })
    }

}

export const getFiveLasteMovies = async (request:express.Request, response:express.Response) => {

    try {

        let numberOfMovie:number = Number(request.params.numberOfMovie);

        let movies:Movie[]|null = await MovieTable.find().sort('-createdAt').limit(numberOfMovie);
         
        response.status(Http_code.OK).json({
            movies,
            datas: {
                "_links": {
                    "reviews": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/:movieId` },
                    "movies": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies` },
                    "movie": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies/:movieId` },
                },
                "_embedded": {},
            },
        });
    } catch (error) {
        console.log(error);
        response.status(Http_code.INTERNALSERVERERROR).json({
            error : error
        })
    }

}


export const deleteMovie = async(request:express.Request, response:express.Response) => {

    let {movieId} = request.params;
    try {
        let movie:Movie|null = await MovieTable.findById(movieId);
        if(!movie){
            return response.status(Http_code.NOTFOUND).json({
                msg : 'Movie is not found !'
            });
        }

        // Send request -> review service
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Host": "review_service.localhost"
            }
        };

        //Send request to review  service for get reviews movie
        await axios.delete(`${process.env.REVIEW_SERVICE_CRUD_Serv_Var}many/`+movieId, axiosConfig);

        movie= await MovieTable.findByIdAndRemove(movieId);

        response.status(Http_code.OK).json({
            msg: `Movie ${movieId} is deleted successfully`,
            datas: {
                "_links": {
                    "reviews": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/:movieId` },
                    "movies": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies` },
                    "movie": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies/:movieId` },
                },
                "_embedded": {},
            },
        })
    } catch (error) {
        console.log(error);
        response.status(Http_code.INTERNALSERVERERROR).json({
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
            userId: request.body.userId,
            title : request.body.title,
            image : request.body.image,
            date : request.body.date,
            rating : request.body.rating,
            description : request.body.description,
            types : request.body.types
        };

        //Check if movie is already exist into database
        let existingMoviewillUpdated:Movie|null = await MovieTable.findById(movieId);
        if(!existingMoviewillUpdated){
            return response.status(Http_code.NOTFOUND).json({
                msg : 'Movie is not exists'
            });
        }

        //update product
        existingMoviewillUpdated = await MovieTable.findByIdAndUpdate(movieId, {
            $set : {

                _id : updatedMovie._id ? updatedMovie._id : existingMoviewillUpdated._id,
                title : updatedMovie.title ? updatedMovie.title : existingMoviewillUpdated.title,
                image : updatedMovie.image ? updatedMovie.image : existingMoviewillUpdated.image,
                date : updatedMovie.date ? updatedMovie.date : existingMoviewillUpdated.date,
                rating : updatedMovie.rating ? updatedMovie.rating : existingMoviewillUpdated.rating,
                description : updatedMovie.description ? updatedMovie.description : existingMoviewillUpdated.description,
                types : updatedMovie.types ? updatedMovie.types : existingMoviewillUpdated.types,
                userId : updatedMovie.userId ? updatedMovie.userId : existingMoviewillUpdated.userId,

            }
        }, { new : true });

        
        response.status(Http_code.OK).json({
            msg: 'Movie is Updated',
            movie: existingMoviewillUpdated,
            datas: {
                "_links": {
                    "reviews": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/${existingMoviewillUpdated?._id}` },
                    "movies": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies` },
                    "movie": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies/${existingMoviewillUpdated?._id}` },
                },
                "_embedded": {},
            },
        });

    } catch (error) {
        console.log(error);
        // @ts-ignore
        if(error.kind === 'ObjectId'){
            return response.status(Http_code.NOTFOUND).json({
                msg : 'Movie is not exists'
            });
        }
        response.status(Http_code.INTERNALSERVERERROR).json({
            error : error
        });
    }
}

export const getMoviesOfUser = async (request:express.Request, response:express.Response) => {

    try {

        const userId = request.params.userId;

        let movies:Movie|null|any = await MovieTable.find({'userId':userId});

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
        // reviews = await axios.get(`${process.env.REVIEW_SERVICE_CRUD_Serv_Var}`+movieId, axiosConfig).then( (resp) => {
                
        //         return resp.data.list_review;
        // })
        // .catch(error => console.log(`reviews of movie ${movieId} dont exist`));

        
        response.status(Http_code.OK).json({
            movies,
            datas: {
                // "_links": {
                //     "reviews": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/${movie._id}` },
                //     "movies": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies` },
                //     "movie": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies/${movie._id}` },
                // },
                "_embedded": {
                    reviews
                }
            }
        });
    } catch (error) {
        console.log(error);
        response.status(Http_code.NOTFOUND).json({
            error : error
        })
    }

}


