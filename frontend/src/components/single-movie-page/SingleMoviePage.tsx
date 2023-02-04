import React, { useEffect, useState }  from "react";
import { useParams } from "react-router-dom";
import '../../styles/components/single-movie-page.scss';
import MoviesService from "../../services/MoviesService";
import Movie from "../../models/movie.interface";
import BannerCardPage from "../card /BannerCardPage";
import { NavLink } from "react-router-dom";

const SingleMoviePage = () => {
    const { movieId } = useParams();

    const [movie, setMovie] = useState<Movie>({
        _id: '',
        userId: '',
        types: [],
        title: 'hello',
        date: '',
        rating: 0,
        description: '',
        image: '',
    });  

    const getMovie = async (movieId : string) => {
            console.log(movieId)
            const movie : Movie = await MoviesService.getMovie(movieId);
            console.log(movie)
            setMovie(movie);
    };

    useEffect(() => {
        if (movieId) {
            getMovie(movieId);
        }
    }, [movieId])

    return (
        <div className='single-movie-page'>
            <NavLink className='back-link' to="/">Go back to homepage</NavLink>
            <BannerCardPage title={movie.title}
                content={movie.description}
                image={movie.image}
                rating={movie.rating} />
        </div>
    )
}

export default SingleMoviePage;