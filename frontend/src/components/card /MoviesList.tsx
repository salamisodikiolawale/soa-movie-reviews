import React, { useState, useEffect, PropsWithChildren } from 'react';
import { filterOption } from '../../models/filterOption';
import Movie from '../../models/movie.interface';
import MoviesService from '../../services/MoviesService';
import '../../styles/components/card/movies-list.scss';
import CardMovie from './CardMovie';

export interface Props {
    filter: filterOption;
}

const MoviesList = ({filter}: PropsWithChildren<Props>) => {    

    const [movies, setMovies] = useState<Movie[]>([]);

    const fetchMovies = async()=>{
        setMovies(await MoviesService.getMovies());
    }

    const getLatestMovies = async(numberOfMovies: Number)=>{
        setMovies(await MoviesService.getLatestMovies(numberOfMovies));
    }
    

    useEffect(() => {
        switch (filter) {
            case filterOption.ALL:
                fetchMovies();
                break;
            case filterOption.LATEST:
                getLatestMovies(10);
                break;
            default:
              console.log(`${filter} is not available.`);
          }
    }, [filter]);

    return (
        <div className='movies-list'>
               
            {movies !== undefined && movies.length > 0 ? (
                movies.map( movie => (
                    <CardMovie 
                    dataParentToChildMovie ={movie}
                    key={movie._id}
                    />
                ))
            ) : <p>No movies yet.</p>}
        </div>
    )
}

export default MoviesList;