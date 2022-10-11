import mongoose from 'mongoose';
import { User } from "../models/User";

const userSchema = new mongoose.Schema({

    username : {type : String, required: true, unique : true },
    email : { type : String, required: true, unique : true },
    hashed_password : { type : String, required: true },
    subscribed_newsletter : { type : Boolean, default: false }
    
}, {timestamps : true});

const UserTable : mongoose.Model<User> = mongoose.model('user', userSchema);

export default UserTable;