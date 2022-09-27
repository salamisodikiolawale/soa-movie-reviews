import mongoose from 'mongoose';
import {Movie} from "../models/Movie";


const movieSchema = new mongoose.Schema({

    title : {type : String, required: true, unique : true },
    image : { type : String, required: true },
    comment : { type : String, required: true },
}, {timestamps : true}); /*>This last line create automatilly : created_at, updated_at*/

const MovieTable:mongoose.Model<Movie>  = mongoose.model('movie', movieSchema);

export default MovieTable;