import express from 'express';
import {createReview, updateReview, deleteReview, getAllReviews} from "../controller/reviewController";

const apiRouter:express.Router = express.Router();

/*
    Usage: Create a review
    URL : http://crudMovieService:3001/api/v1/review
    Method : POST
    Fields: movieReviewId, username, rating, comment, publicationDate
    Access: Public
 */
apiRouter.post('/review', createReview);

/*
    Usage: Update a review
    URL : http://127.0.0.1:3001/api/v1/review/:reviewId
    Method : PUT
    Fields: name, image, comment
    Access: Public
 */
apiRouter.put('/review/:reviewId', updateReview);

/*
    Usage: Delete a review
    URL : http://127.0.0.1:3001/api/v1/review/:reviewId
    Method : DELETE
    Fields : movieReviewId, username, rating, comment, publicationDate
    Access: Public
 */
apiRouter.delete('/review/:reviewId', deleteReview);

/*
    Usage: Get all the reviews
    URL : http://127.0.0.1:3001/api/v1/review
    Method : GET
    Fields:  movieReviewId, username, rating, comment, publicationDate
    Access: Public
 */
apiRouter.get('/review/:MovieId', getAllReviews);

/*
    Usage: Get a Single product
    URL : http://127.0.0.1:3000/api/v1/review/:reviewId
    Method : GET
    Fields: name, image, price, qty, info
    Access: Public
 */

//apiRouter.get('/review/:MovieId', getallReview);

export default apiRouter;