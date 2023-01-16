import mongoose from 'mongoose';
import {Movie} from "../models/Movie";

const TypeOfMovies = ['SF','POLICIER','DRAMA','AVENTURE','THRILLER','HORREUR','AMOUR'];

const movieSchema = new mongoose.Schema<Movie>({

    title : {type : String, required: true, unique:false },
    date : {type : Date, required: true },
    ranting : {type : Number, required: true},
    description : {type : String, required: true},
    image : {type : String, required: true},
    types : {type : [String], enum: TypeOfMovies, required: true},

}, {timestamps : true}); /*>This last line create automatilly : created_at, updated_at*/

const MovieTable:mongoose.Model<Movie>  = mongoose.model('movie', movieSchema);

export default MovieTable;