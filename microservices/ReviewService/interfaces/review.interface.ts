import mongoose from 'mongoose';

export interface Review {
    //Vérifie qu'un ID existe
    _id? : string;

    //Attributs de Review
    movieReviewId : string;
    username : string;
    rating : number;
    comment : string;
    publicationDate? : Date;
}