import express from "express";
import {Review} from "../database/models/Review";
import {Movie} from "../database/models/Movie";
import ReviewTable from "../database/schemas/ReviewSchema";
import MovieTable from "../database/schemas/MovieSchema";
import { Http_code } from "../config/http_code";


/**
 * CREATE REVIEW
 * @param request
 * @param response 
 * @returns response 200 if succefully 404 else
 */
export async function createReview(request:express.Request, response:express.Response){
    try {
        // Data recuperation from the request
        let review : Review = {
            movieReviewId : request.body.movieReviewId,
            username : request.body.username,
            rating : request.body.rating,
            comment : request.body.comment,
            publicationDate : request.body.publicationDate
        };
        //Verify if data already exist in the database
        let existingMovie:Movie |null = await MovieTable.findById(review.movieReviewId).exec();
        if(existingMovie == null){
            return response.status(Http_code.NOTFOUND).json({
                msg: 'Movie does not exist'
            });
        }

        //Create the review into database
        let newReview= new ReviewTable(review);
        review = await newReview.save();
        response.status(Http_code.OK).json({
            msg: 'Review is created successfully',
            datas: {
                "_links": {
                    "review": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/review/${review._id}` },
                    "reviews": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/${review.movieReviewId}` },
                    "movies": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies` },
                    "item": []
                },
                "_embedded": {}
            }
        });

    } catch (error){
        console.log(error);
        response.status(Http_code.NOTFOUND).json({
            error : error
        });
    };
}

/**
 * DELETE REVIEW
 * @param request 
 * @param response 
 */
export async function deleteReview(request : express.Request , response : express.Response){

        let reviewId = request.params.reviewId

        //Verify if review exist
        const review = await ReviewTable.findById(reviewId);
        if(review){

            // Delete the review in the database
            const review = await ReviewTable.deleteOne({_id : reviewId}).exec().then( (m) => {
                
                response.status(Http_code.OK).json({ 
                    msg: `Review ${reviewId} is deleted successfully`,
                    datas: {
                        "_links": {
                            "reviews": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/:movieId` },
                            "movies": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies` },
                            "movie": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies/:movieId` },
                        },
                        "_embedded": {},
                    },
                });
                
            }).catch( (error) => {

                console.log(error);
                response.status(Http_code.INTERNALSERVERERROR).json({
                    error : error
                });
            });

        } else {
            response.status(Http_code.NOTFOUND).json({error : 'Not Found' });
        }
        
        
}


/**
 * UPDATE REVIEW
 * @param request 
 * @param response 
 * @returns 
 */
export async function updateReview(request : express.Request , response : express.Response){

    try {

         // Data recuperation from the request
         let reviewId =request.params.reviewId
         let review : Review = {
            movieReviewId : request.body.movieReviewId,
            username : request.body.username,
            rating : request.body.rating,
            comment : request.body.comment,
            publicationDate : request.body.publicationDate
        };

        //Verify if the review already exist in the database
        let existingMovie:Review|null = await ReviewTable.findOne({ movieReviewId : review.movieReviewId});
        if(existingMovie == null){
            return response.status(Http_code.UNAUTHORIZED).json({
                msg: 'Review does not exist'
            });
        }
        ReviewTable.findByIdAndUpdate(reviewId, {rating : request.body.rating, comment : request.body.comment,publicationDate : request.body.publicationDate}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated User : ", docs);
            }
        })
        response.status(Http_code.OK).json({
            msg: 'Review is updated successfully',
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
    } catch (error) {
        console.log(error);
        response.status(Http_code.INTERNALSERVERERROR).json({
            error : error
        });  
    }
}

/**
 * Function to get all the reviews for one movie
 * @param request 
 * @param response 
 */
export const getAllReviewsOnMovie = async (request:express.Request, response:express.Response) => {
    
    try {
        let MovieId =request.params.MovieId
        let list_review = null;
        let movieExist:Movie|null = await MovieTable.findById(MovieId);
        if(movieExist){
            list_review = await ReviewTable.find({movieReviewId : MovieId},{}).exec()//Get all reviews for the movie

            response.status(Http_code.OK).json({
                list_review,
                datas: {
                    "_links": {
                        "review": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/:reviewId` },
                        "reviews": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/${MovieId}` },
                        "movies": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies` },
                        "movie": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies/${MovieId}` },
                    },
                    "_embedded": {},
                },
            });
        } else {
            response.status(Http_code.NOTFOUND).json({error: 'movie not existe'});
        }

        
    } catch (error) {
        console.log(error);
        response.status(Http_code.INTERNALSERVERERROR).json({
            error : error
        })
    }

}

//Function to get all the reviews for one movie
export const getReview = async (request:express.Request, response:express.Response) => {
    
    try {
        let reviewId =request.params.reviewId;
        let review:any="";

        let reviewExist:Review|null = await ReviewTable.findById(reviewId);
        if(reviewExist){
            review = await ReviewTable.find({_id : reviewId},{}).exec()

            response.status(Http_code.OK).json({
                review,
                datas: {
                    "_links": {
                        "review": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/${review._id}` },
                        "movies": { "href": `http://crud_service.localhost:${process.env.PORT_CRUD_Serv_Var}/api/v1/movies` },
                        "reviews": { "href": `http://review_service.localhost:${process.env.PORT_Rev_Serv_Var}/api/v1/reviews/${review.movieReviewId}` },
                        "item": []
                    },
                    "_embedded": {}
                }
            });
        } else {
            response.status(Http_code.NOTFOUND).json({error: 'review not exist'});
        }

        
    } catch (error) {
        console.log(error);
        response.status(Http_code.INTERNALSERVERERROR).json({
            error : error
        })
    }

}
