import axios from "axios";
import Movie from "../models/movie.interface";
import { MovieData } from "../components/single-movie-page/SingleMoviePage";

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

    getMovieData = async(movieId: string):Promise<MovieData> => {
        const url:string=`http://localhost:3010/api/v1/movies/movie/${movieId}`;
        const movieData : MovieData = {
            movie: {
                _id: '',
                userId: '',
                types: [],
                title: '',
                date: '',
                rating: 0,
                description: '',
                image: '',
            },
            reviews_list: []
        };
    
        const movieResult = await axios.get(url);
        const reviewsList = await this.getMovieReviews(movieResult.data.datas._links.reviews.href);
        movieData.movie = movieResult.data.movie;
        movieData.reviews_list = reviewsList;
        return movieData;
    }

    getMovieReviews = async(link: string):Promise<any> => {
        const url:string=link;
        const res = await axios.get(url);
        return res.data.list_review;
    }
    
}

export default new Moviesservice();