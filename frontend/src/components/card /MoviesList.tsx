import React, { PropsWithChildren } from 'react';
import Movie from '../../models/movie.interface';
import '../../styles/components/card/movies-list.scss';
import CardMovie from './CardMovie';

export interface Props {
    movies: Movie[];
}

const MoviesList = ({movies}: PropsWithChildren<Props>) => {

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