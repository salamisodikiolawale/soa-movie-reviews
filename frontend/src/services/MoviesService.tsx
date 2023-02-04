import axios from "axios";
import Movie from "../models/movie.interface";


class Moviesservice {
    
    createMovie(formData:Movie) {
        
        const url:string="http://localhost:3010/api/v1/movies";

        //Not finish : get valide value into localstorage
        formData.userId='63cbf7b45ca403af0e641598';

        return axios.post(url, formData);
    }

    getMovies = async():Promise<Movie[]> => {
        const url:string="http://localhost:3010/api/v1/movies";
        
        let movies:Movie[] = []; 
        const res = await axios.get(url);
        movies = res.data.movies;
        return movies;
    }

    getLatestMovies = async(numberOfMovies: Number):Promise<Movie[]> => {
        const url:string=`http://localhost:3010/api/v1/movies/${numberOfMovies}`;
        
        let movies:Movie[] = []; 
        const res = await axios.get(url);
        movies = res.data.movies;
        return movies;
    }

    getMovie = async(movieId: string):Promise<Movie> => {
        const url:string=`http://localhost:3010/api/v1/movies/movie/${movieId}`;
        
        let movie:Movie; 
        const res = await axios.get(url);
        movie = res.data.movie;
        return movie;
    }
    
}

export default new Moviesservice();