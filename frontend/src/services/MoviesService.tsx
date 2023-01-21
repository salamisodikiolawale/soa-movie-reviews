import axios from "axios";
import Movie from "../models/movie.interface";

const movies:Movie[] = [{
    "types": [],
    "_id": "63349c891bbab58f0e24321a",
    "title": "War movie 2024",
    "ranting": 2,
    "description": "The war is very complecated",
    "image": "http://google/movies/1",
    },
    {
        "types": [],
        "_id": "63349c891bbab58f0e24321a",
        "title": "War movie 2024",
        "ranting": 2,
        "description": "The war is very complecated",
        "image": "http://google/movies/1",
    },
    {
        "types": [],
        "_id": "63349c891bbab58f0e24321a",
        "title": "War movie 2024",
        "ranting": 2,
        "description": "The war is very complecated",
        "image": "http://google/movies/1",
    },
    {
        "types": [],
        "_id": "63349c891bbab58f0e24321a",
        "title": "War movie 2024",
        "ranting": 2,
        "description": "The war is very complecated",
        "image": "http://google/movies/1",
    },
]
class Moviesservice {

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