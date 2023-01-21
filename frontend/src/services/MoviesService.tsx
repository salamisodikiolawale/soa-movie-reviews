import axios from "axios";
import Movie from "../models/movie.interface";


class Moviesservice {

    createMovie(formData:Movie) {
        
        const url:string="http://crud_service.localhost/api/v1/movies";

        //Not finish : get valide value into localstorage
        formData.userId='63cbf7b45ca403af0e641598';

        return axios.post(url, formData);
    }

    getMovies = async():Promise<Movie[]> => {
        const url:string="http://crud_service.localhost/api/v1/movies";
        
        let movies:Movie[] = []; 
        await axios.get(url).then(res => {
            movies = res.data.movies;
        });
        return movies;
    }

}

export default new Moviesservice();