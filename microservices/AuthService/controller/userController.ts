import express from "express";
import { hash, compare } from 'bcrypt'
import { User } from "../database/models/User";
import UserTable from "../database/schemas/UserSchema";
import mongoose, { MongooseError } from 'mongoose';

// --------------- CREATE USER
export const createUser = async (request:express.Request, response:express.Response) : Promise<express.Response> => {
    console.log("New user is "  + JSON.stringify(request.body));
    
    const hashedPassword = await hash(request.body.password, 10);

    // New user
    let newUser : User = {
        username : request.body.username,
        email : request.body.email,
        hashed_password : hashedPassword,
        subscribed_newsletter: request.body.subscribed_newsletter
    };

    // Try inserting new user to database
    try {
        let userAdding = new UserTable(newUser)

        await userAdding.save();

        return response.status(200).json({
            msg: 'Your account has been successfully created !'
        });
    } catch (e) {
        // Catch validation errors for required fields and send appropriate error message
        if (e instanceof mongoose.Error.ValidationError) {
            let errorFields : string[] = Object.keys(e.errors);

            for (let errField of errorFields) {
                console.log(e.errors[errField].message ? e.errors[errField].message : `Field ${e.errors[errField]} triggers an error`);
            }

            const errorMessage : string = errorFields.length > 1 ? `You have not filled these fields : ${errorFields}` : `You have not filled the field : ${errorFields[0]}`

            return response.status(401).json({
                msg: errorMessage
            });
        } 
        // Unique fields errors
        else {
            return response.status(401).json({
                msg: `Your email or username has already been used. Please retry with another one.`
            });
        }
    }
}

// --------------- GET LIST OF USERS
export const getUsers = () => {

}