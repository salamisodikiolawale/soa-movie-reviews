import mongoose from 'mongoose';

export interface Movie {

    _id? : string;
    title : string;
    image : string;
    comment : string;
    pubDate? : string;
    created_at? : string;
    updated_at? : string;
}