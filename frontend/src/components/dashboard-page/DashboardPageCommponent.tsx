import { useEffect, useState } from 'react';
import Movie from '../../models/movie.interface';
import MoviesService from '../../services/MoviesService';
import '../../styles/components/dashboard-page.scss';
import MovieFormUpdate from '../movies/MovieFormUpdate';

const DashboardPageComponent = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [showPopForMovie, setPopForMovie] = useState<boolean>(false);
    const [movieUpdate, setMovieUpdate] = useState<Movie|undefined>();
    

    const getMovieOfCurrentUser = async()=>{
        setMovies(await MoviesService.getMovieOfUser());
    }

    const removeMovie = async (idMovie:string|undefined) => {
        await MoviesService.removeMovie(idMovie);
    }
    
    useEffect( () => {
        getMovieOfCurrentUser();
    }, [])

    return <>
        <div className="container">

            <div className="statContainer">
                div
            </div>

            <div className="showAndActionsContainer">
                <table  className='table'>
                
                <tbody>

                    <tr>
                        <td>Title</td>
                        <td>Rating</td>
                        <td>Image</td>
                        <td>Opération</td>
                    </tr>
                    {
                        movies !== undefined && movies.length > 0 &&
                            movies.map( (movie, index) => (
                                <tr key={movie._id}>

                                    <td key={movie.title}>{movie.title}</td>
                                    <td>{movie.rating}/20</td>
                                    <td><img src={movie.image} width="100" height="50" alt={movie.image} /></td>
                                    <td className='operationBtn'>
                                        <button onClick={ () => {
                                            setPopForMovie(true);
                                            setMovieUpdate(movie);
                                        }}>Update</button>
                                        <button onClick={ () => removeMovie(movie._id)}>Delete</button>
                                        <button>Detail</button>
                                    </td>
                                </tr>
                                )
                            )
                    }
                </tbody>
                        

                </table>
            </div>
        </div>
        {showPopForMovie ? <MovieFormUpdate movieUpdate={movieUpdate}/>: null}
    </>
}

export default DashboardPageComponent;