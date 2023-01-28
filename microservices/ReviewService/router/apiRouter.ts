import express from 'express';
import {createReview, updateReview, deleteReview, getAllReviewsOnMovie, getReview} from "../controller/reviewController";

const apiRouter:express.Router = express.Router();

/*
    Usage: Get reviews of movies
    URL : http://review_service.localhost:3001/api/v1/reviews/:MovieId
    Method : GET
    Fields:  movieReviewId, username, rating, comment, publicationDate
    Access: Public
 */
apiRouter.get('/reviews/:MovieId', getAllReviewsOnMovie);


/*
    Usage: Get a Single review
    URL : http://review_service.localhost:3001/api/v1/reviews/review/:reviewId
    Method : GET
    Fields: movieReviewId, username, rating, comment, publicationDate
    Access: Public
 */

apiRouter.get('/reviews/review/:reviewId', getReview);


/*
    Usage: Create a review
    URL : http://review_service.localhost:3001/api/v1/review
    Method : POST
    Fields: movieReviewId, username, rating, comment, publicationDate
    Access: Public
 */
apiRouter.post('/reviews', createReview);

/*
    Usage: Update a review
    URL : http://review_service.localhost:3001/api/v1/reviews/:reviewId
    Method : PUT
    Fields: name, image, comment
    Access: Public
 */
apiRouter.put('/reviews/:reviewId', updateReview);

/*
    Usage: Delete a review
    URL : http://review_service.localhost:3001/api/v1/reviews/:reviewId
    Method : DELETE
    Fields : movieReviewId, username, rating, comment, publicationDate
    Access: Public
 */
apiRouter.delete('/reviews/:reviewId', deleteReview);

export default apiRouter;