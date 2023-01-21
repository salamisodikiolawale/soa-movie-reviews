export interface Movie {

    _id? : string;
    userId : string;
    title : string;
    date : string;
    rating:number;
    description:string;
    image : string;
    types? : string[]
    created_at? : string;
    updated_at? : string;
}