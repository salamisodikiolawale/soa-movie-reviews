import mongoose from 'mongoose';
import {Movie} from "../models/Movie";


const TypeOfMovies = ['SF','POLICIER','DRAMA','AVENTURE','THRILLER','HORREUR','AMOUR'];

const movieSchema = new mongoose.Schema<Movie>({

    title : {type : String, required: true, unique:false },
    userId: {type: String, required:true},
    date : {type : String, required: true },
    rating : {type : Number, required: true},
    description : {type : String, required: true},
    image : {type : String, required: true},
    types : {type : [String], enum: TypeOfMovies, required: false},

}, {timestamps : true}); /*>This last line create automatilly : created_at, updated_at*/

const MovieTable:mongoose.Model<Movie>  = mongoose.model('movie', movieSchema);

export default MovieTable;