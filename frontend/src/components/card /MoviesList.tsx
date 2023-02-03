import React, { useState, useEffect, PropsWithChildren } from 'react';
import Movie from '../../models/movie.interface';
import MoviesService from '../../services/MoviesService';
import '../../styles/components/card/movies-list.scss';
import CardMovie from './CardMovie';

export interface Props {
    filter: string;
}

const MoviesList = (props: PropsWithChildren<Props>) => {    

    const [movies, setMovies] = useState<Movie[]>([]);

    const fetchMovies = async()=>{
        setMovies(await MoviesService.getMovies());
    }

    const getLatestMovies = async(numberOfMovies: Number)=>{
        setMovies(await MoviesService.getLatestMovies(numberOfMovies));
    }
    

    useEffect(() => {
        if (props.filter == 'all') {
            fetchMovies();
        } else if (props.filter == 'latest') {
            getLatestMovies(10);
        }
    }, []);

    return (
        <div className='movies-list'>
               
            {movies !== undefined && movies.length > 0 && (
                movies.map( movie => (
                    <CardMovie 
                    dataParentToChildMovie ={movie}
                    key={movie._id}
                    />
                ))
            )}
        </div>
    )
}

export default MoviesList;