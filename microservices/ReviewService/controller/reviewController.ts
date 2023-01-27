import express from "express";
import {Review} from "../database/models/Review";
import {Movie} from "../database/models/Movie";
import ReviewTable from "../database/schemas/ReviewSchema";
import MovieTable from "../database/schemas/MovieSchema";
import { Http_code } from "../config/http_code";


//Fonction qui permet de créer une review et de l'ajouter à la base de données.
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
            review:review
        });

    } catch (error){
        console.log(error);
        response.status(Http_code.NOTFOUND).json({
            error : error
        });
    };
}

//Function to delete a review in the database
export async function deleteReview(request : express.Request , response : express.Response){

        let reviewId = request.params.reviewId

        //Verify if review exist
        const review = await ReviewTable.findById(reviewId);
        if(review){

            // Delete the review in the database
            const review = await ReviewTable.deleteOne({_id : reviewId}).exec().then( (m) => {
                
                response.status(Http_code.OK).json({ msg: 'Review is delete successfully'});
                
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


//Function to update a review in the database
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
            return response.status(401).json({
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
        response.status(200).json({
            msg: 'Review is updated successfully',
            product:review
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error : error
        });  
    }
}

//Function to get all the reviews for one movie
export const getAllReviewsOnMovie = async (request:express.Request, response:express.Response) => {

    try {
        let MovieId =request.params.MovieId
        let list_review = null;
        let movieExist:Movie|null = await MovieTable.findById(MovieId);
        if(movieExist){
            list_review = await ReviewTable.find({movieReviewId : MovieId},{}).exec()//Get all reviews for the movie

            const _link = [

                { rel: "self", href: 'http://127.0.0.1' },
                {
                    rel: "create",
                    method: "POST",
                    title: 'Create Review',
                    href: '/review',
                    data: {
                        "movieReviewId" : "text",
                        "username" : "text",
                        "rating" : "number",
                        "comment" : "date",
                        "publicationDate" : "date"
                    }
                },
                {
                    rel: "delete",
                    method: "DELETE",
                    title: 'Delete Review ',
                    href: '/review',
                    param:{
                        "reviewId" : "text"
                    }
                },
                {
                    rel: "update",
                    method: "POST",
                    title: 'Update Review ',
                    href: '/review',
                    data : {
                        "movieReviewId" : "text",
                        "username" : "text",
                        "rating" : "number",
                        "comment" : "date",
                        "publicationDate" : "date"
                    }
                },
                {
                    rel: "get",
                    method: "get",
                    title: 'Get All Review ',
                    href: '/review',
                    param:{
                        "movieId" : "text"
                    }
                }
            ];
            response.status(Http_code.OK).json({
                list_review,
                _link
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

