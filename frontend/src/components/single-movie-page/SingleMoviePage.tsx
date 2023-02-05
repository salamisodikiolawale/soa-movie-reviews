import React, { useContext, useEffect, useState }  from "react";
import { useParams } from "react-router-dom";
import '../../styles/components/single-movie-page.scss';
import MoviesService from "../../services/MoviesService";
import Movie from "../../models/movie.interface";
import BannerCardPage from "../card /BannerCardPage";
import Review from "../../models/review.interface";
import Comment from "./Comment";
import { Spinner } from "react-bootstrap";
import BackLink from "../BackLink";
import Form from 'react-bootstrap/Form';
import ButtonAction from "../ButtonAction";
import ReviewsService from "../../services/ReviewsService";
import { Context } from "../../context/Context";

export interface MovieData {
    movie : Movie,
    reviews_list: Review[]
}

const SingleMoviePage = () => {
    const { movieId } = useParams();
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { state } = useContext(Context);

    const [rating, setRating] = useState('');

    const [newComment, setNewComment] = useState(false);
    const [comment, setComment] = useState('');

    const [movie, setMovie] = useState<Movie>({
        _id: '',
        userId: '',
        types: [],
        title: '',
        date: '',
        rating: 0,
        description: '',
        image: '',
    });  
    const [reviews, setReviews] = useState<Review[]>([
        {
            _id: '',
            movieReviewId: '',
            username: '',
            comment: '',
            rating: 0,
            publicationDate: new Date()
        }
    ]);  

    const movieIdExist = () => {
        return movieId !== undefined;
    }

    const initializeFormData = () => {
        setValidated(false);
        setComment('');
        setRating('');
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
        } else {
            let id : string = movieIdExist() ? movieId! : '';
            let userInfos : any = await state.userData.userInfos;

            const res = await ReviewsService.createReview({
                movieReviewId : id,
                username : userInfos.username !== undefined ? userInfos.username : 'aosmovie',
                rating : parseInt(rating),
                comment : comment
            })
            if (res.status === 200) {
                setNewComment(true);
            }
        }
        setValidated(true);
    }

    const ratingRegex = '^(0|[1-9]|1[0-9]|20)$';

    const getMovieData = async (movieId : string) => {
            setNewComment(false);
            initializeFormData();
            console.log(movieId)
            const movieData : MovieData = await MoviesService.getMovieData(movieId);
            console.log(movieData);
            setMovie(movieData.movie);
            setReviews(movieData.reviews_list)
            setIsLoading(false);
    };

    useEffect(() => {
        if (movieId) {
            getMovieData(movieId);
        }
    }, [movieId, newComment])

    return (
        <div className='single-movie-page'>
            { isLoading && !movieIdExist() ? 
                    <div className='loading-spinner'>
                        <Spinner animation="border" role="status" />
                    </div>
            :
            <>
                <BackLink />
                <BannerCardPage title={movie.title}
                    content={movie.description}
                    image={movie.image}
                    rating={movie.rating} />
                <div className="comments-section">
                    <h3 className="titles">Reviews</h3>
                    { reviews.length > 0 ? (
                    reviews.map( (currentReview, index)=> (
                        <Comment review={currentReview} key={index} />
                    ))) : <p>No reviews yet.</p>}
                </div>

                { (state.userData.isConnected) && 
                
                <div className="add-comment">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="reviewForm">
                            <Form.Label>Write a review</Form.Label>
                            <Form.Control 
                            placeholder="Tell us what you think about this movie..."
                            required={true}
                            type='comment'
                            name='comment'
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            as="textarea" rows={3} />
                            <Form.Control.Feedback type="invalid">
                                Please tell us your opinion on the movie.
                            </Form.Control.Feedback> 
                        </Form.Group>
                        <Form.Group className="my-3" controlId="ratingForm">
                            <Form.Control 
                                required={true}
                                type='rating'
                                name='rating'
                                onChange={(e) => setRating(e.target.value)}
                                placeholder='Your rating'
                                pattern={ratingRegex}
                                value={rating}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a rating between 0 and 20. Your rating has to be a integer.
                            </Form.Control.Feedback>       
                        </Form.Group>
                        <ButtonAction text="Add comment" variant="primary" wrapperClass="submit-button" type="submit" />
                    </Form>
                </div>
                }
            </> }
        </div>
    )
}

export default SingleMoviePage;