export default interface Review {
    _id? : string;

    //Attributs de Review
    movieReviewId : string;
    username : string;
    rating : number;
    comment : string;
    publicationDate? : Date;
}