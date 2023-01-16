import mongoose from 'mongoose';

export interface Review {
    //Vérifie qu'un ID existe
    _id? : string;

    //Attributs de Review
    movieReviewId : string;
    username : string;
    rating : number;
    comment : string;
    publicationDate : Date;

    //Créé automatiquement par la BDD
    created_at? : string;
    updated_at? : string;
}