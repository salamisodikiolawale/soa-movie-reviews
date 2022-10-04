import express from "express";
import { hash, compare } from 'bcrypt'
import { User } from "../database/models/User";
import UserTable from "../database/schemas/UserSchema";
import mongoose from 'mongoose';
const { validationResult } = require('express-validator');

// --------------- CREATE USER
export const createUser = async (request:express.Request, response:express.Response) : Promise<express.Response> => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(401).json({ errors: errors.array() });
    }

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

// --------------- LOGIN METHOD
export const login = async (request:express.Request, response:express.Response) : Promise<express.Response> => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(401).json({ errors: errors.array() });
    }

    if (!request.body.username && !request.body.email) {
        return response.status(401).json({
            msg: 'You did not fill your username or email'
        });
    }

    const userToAuthenticate = !!request.body.username ? await UserTable.findOne({ username: request.body.username }) : await UserTable.findOne({ email: request.body.email });

    try {
        if (!!userToAuthenticate) {

            const isPasswordCorrect = await compare(request.body.password, userToAuthenticate.hashed_password);
            
            if (!!isPasswordCorrect) {
                return response.status(200).json({
                    msg: 'You are now logged in !'
                });
            } else {
                return response.status(401).json({
                    msg: 'Your password is incorrect'
                });
            }
            
        } else {
            return response.status(200).json({
                msg: 'Username, email or password incorrect.'
            });
        } 
    } catch (e) {
        return response.status(500).json({
            msg: 'Unknown server error triggered. Please try again.'
        });
    }
}

// --------------- GET LIST OF USERS
export const getUsers = () => {

}