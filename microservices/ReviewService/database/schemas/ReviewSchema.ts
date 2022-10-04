import mongoose from 'mongoose';
import {Review} from "../models/Review";

//Crée le schéma d'une Review dans la base de données.
const ReviewSchema = new mongoose.Schema({
    movieReviewId : { type : String, required: true, unique : false},
    username : { type : String, required : true },
    rating : { type : Number, required : true},
    comment : { type : String, required: true },
    publicationDate : { type : Date, required : true }
}, {timestamps : true}); /*>This last line create automatilly : created_at, updated_at*/


const ReviewTable : mongoose.Model<Review>  = mongoose.model('review', ReviewSchema);

export default ReviewTable;