import axios from "axios";
import Movie from "../models/movie.interface";
import { MovieData } from "../components/single-movie-page/SingleMoviePage";

class Moviesservice {
    
    private url:string="http://localhost:3010/api/v1/movies";
    private userId:string|null = sessionStorage.getItem('userId');

    createMovie(formData:Movie) {

        formData.userId = this.userId;
        return axios.post(this.url, formData);
    }

    getMovies = async():Promise<Movie[]> => {
        
        let movies:Movie[] = []; 
        const res = await axios.get(this.url);
        movies = res.data.movies;
        return movies;
    }

    getLatestMovies = async(numberOfMovies: Number):Promise<Movie[]> => {
        
        let movies:Movie[] = []; 
        const res = await axios.get(this.url+`/${numberOfMovies}`);
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
    
    getMovieOfUser = async(): Promise<Movie[]> => {
        let movies:Movie[] = []; 
        const res = await axios.get(this.url+`/user/${this.userId}`);
        movies = res.data.movies;
        return movies;
    }

    removeMovie = async(idMovie:string|undefined) => {
        await axios.delete(this.url+`/${idMovie}`)
    }

    updateMovie(formData:Movie) {
        formData.userId = this.userId;
        return axios.put(this.url+`/${formData._id}`, formData);
    }

    getMovieReviews = async(link: string):Promise<any> => {
        const url:string=link;
        const res = await axios.get(url);
        return res.data.list_review;
    }
    
}

export default new Moviesservice();