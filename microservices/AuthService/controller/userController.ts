import express from "express";
import { hash, compare } from 'bcrypt'
import { User } from "../database/models/User";
import UserTable from "../database/schemas/UserSchema";
import mongoose from 'mongoose';
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config( {path : '../.env'});
import { ErrorModel } from "../database/models/ErrorModel"

const { validationResult } = require('express-validator');

// SERVER ERROR
let serverError : ErrorModel = {
    msg : "Unknown server error triggered. Please try again.",
    param : "server",
    location : "body",
}

// --------------- CREATE USER
export const createUser = async (request:express.Request, response:express.Response) : Promise<express.Response> => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        let validationErrors : ErrorModel[] = errors.array()[0]["nestedErrors"] ?? errors.array();
        return response.status(401).json({ errors: validationErrors });
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
        let usedIdentifierErrors : ErrorModel[] = [{
                msg : "Your email or username has already been used. Please retry with another one.",
                param : "general",
                location : "body",
            }
        ]
        return response.status(401).json({
            errors: usedIdentifierErrors
        });
    }
}

// --------------- LOGIN METHOD
export const login = async (request:express.Request, response:express.Response) : Promise<express.Response> => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        let validationErrors : ErrorModel[] = errors.array()[0]["nestedErrors"] ?? errors.array();
        return response.status(401).json({ errors: validationErrors });
    }

    const userToAuthenticate = !!request.body.username ? await UserTable.findOne({ username: request.body.username }) : await UserTable.findOne({ email: request.body.email });

    try {
        if (!!userToAuthenticate) {

            const isPasswordCorrect = await compare(request.body.password, userToAuthenticate.hashed_password);
            
            if (!!isPasswordCorrect) {
                return response.status(200).json({
                    userId: userToAuthenticate._id,
                    token: jwt.sign(
                        { userId: userToAuthenticate._id },
                        process.env.JWT_SECRET,
                        { expiresIn: process.env.JWT_EXPIRATION }
                    ),
                    msg: 'You are now logged in !'
                });
            } else {
                let wrongPasswordError : ErrorModel = {
                    msg : "Your password is incorrect.",
                    param : "password",
                    location : "body",
                }
                
                return response.status(401).json({
                    errors: [wrongPasswordError]
                });
            }
            
        } else {
            let wrongIdentifierErrors : ErrorModel[] = [{
                    msg : "Your username or email is wrong or not registered yet.",
                    param : "general",
                    location : "body",
                }
            ]

            return response.status(401).json({
                errors: wrongIdentifierErrors
            });
        } 
    } catch (e) {
        return response.status(500).json({
            errors : [serverError]
        });
    }
}

// --------------- GET LIST OF USERS
export const getUsers = async (request:express.Request, response:express.Response) => {

    try {
        const users = await UserTable.find();
        return response.status(200).json({
            users: users
        });
    } catch(e) {
        return response.status(500).json({
            errors : [serverError]
        });
    }
}

// GET USER BY ID
export const getUserById = async (request:express.Request, response:express.Response) => {

    try {
        const userToFind = await UserTable.findById(request.params.id);
        return response.status(200).json(userToFind);
    } catch(e) {
        return response.status(500).json({
            errors : [serverError]
        });
    }
    
}

// DELETE USER BY ID
export const deleteUserById = async (request:express.Request, response:express.Response) => {

    try {
        await UserTable.deleteOne({ id: request.params.id });
        return response.status(200).json({
            msg: "Deleted user successfully !",
            userDeleted: request.params.id
        });
    } catch(e) {
        return response.status(500).json({
            errors : [serverError]
        });
    }
    
}

// UPDATE USERNAME
export const updateUserUsername = async (request:express.Request, response:express.Response) => {
    // TODO : needs refactoring
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        let validationErrors : ErrorModel[] = errors.array()[0]["nestedErrors"] ?? errors.array();
        return response.status(401).json({ errors: validationErrors });
    }

    const newUsername = request.body.username;

    // TODO to refactor with mongoose unique validator
    const userAlreadyEx = await UserTable.findOne({ username: newUsername });
    if (!!userAlreadyEx) {
        let noUniqueError : ErrorModel = {
            msg : "Username already used. Please try with another one.",
            param : "username",
            location : "body",
        }
        return response.status(401).json({
            errors: [noUniqueError]
        });
    }

    try {
        await UserTable.findByIdAndUpdate(request.params.id, { username: newUsername });
        const userUpdated = await UserTable.findById(request.params.id);

        return response.status(200).json({
            msg: "User successfully updated !",
            userUpdated: userUpdated
        });
    } catch(e) {
        return response.status(500).json({
            errors : [serverError]
        });
    }
    
}

// UPDATE EMAIL
export const updateUserEmail = async (request:express.Request, response:express.Response) => {
    // TODO : needs refactoring
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        let validationErrors : ErrorModel[] = errors.array()[0]["nestedErrors"] ?? errors.array();
        return response.status(401).json({ errors: validationErrors });
    }

    const newEmail = request.body.email;

    // TODO to refactor with mongoose unique validator
    const userAlreadyEx = await UserTable.findOne({ email: newEmail });
    if (!!userAlreadyEx) {
        let noUniqueError : ErrorModel = {
            msg : "Email already used. Please try with another one.",
            param : "email",
            location : "body",
        }
        return response.status(401).json({
            errors: [noUniqueError]
        });
    }
    
    try {
        await UserTable.findByIdAndUpdate(request.params.id, { email: newEmail });
        const userUpdated = await UserTable.findById(request.params.id);

        return response.status(200).json({
            msg: "User successfully updated !",
            userUpdated: userUpdated
        });
    } catch(e) {
        return response.status(500).json({
            errors : [serverError]
        });
    }
    
}

// UPDATE USER PASSWORD
export const updateUserPassword = async (request:express.Request, response:express.Response) => {
    // TODO : needs refactoring
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        let validationErrors : ErrorModel[] = errors.array()[0]["nestedErrors"] ?? errors.array();
        return response.status(401).json({ errors: validationErrors });
    }

    const newHashedPassword = await hash(request.body.password, 10);
    try {
        await UserTable.findByIdAndUpdate(request.params.id, { hashed_password: newHashedPassword });
        const userUpdated = await UserTable.findById(request.params.id);

        return response.status(200).json({
            msg: "User password successfully updated !",
            userUpdated: userUpdated
        });
    } catch(e) {
        return response.status(500).json({
            errors : [serverError]
        });
    }
    
}