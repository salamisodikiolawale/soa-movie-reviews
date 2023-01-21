import React, { useState, useEffect } from 'react';
import Movie from '../../models/movie.interface';
import MoviesService from '../../services/MoviesService';
import '../../styles/components/card/card-movie-page.scss';
import CardMovie from './CardMovie';

const CardMoviePage = () => {

    const [movies, setMovies] = useState<Movie[]>([]);

    const fetchMovies = async()=>{
        setMovies(await MoviesService.getMovies());
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className='cards-movies'>
               
            {movies !== undefined && movies.length > 0 && (
                movies.map( movie => (
                    <CardMovie 
                    dataParentToChildMovie ={movie}
                    />
                ))
            )}
        </div>
    )
}

export default CardMoviePage;