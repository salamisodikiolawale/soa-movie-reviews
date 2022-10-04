export interface Movie {

    _id? : string;
    title : string;
    date : Date;
    ranting:number;
    description:string;
    image : string;
    types : String[]
    created_at? : string;
    updated_at? : string;
}