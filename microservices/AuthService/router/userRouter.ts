import express from 'express';
import { createUser, getUsers, login } from "../controller/userController";
const { check, oneOf } = require('express-validator');

// Express validators

const userRouter:express.Router = express.Router();

// Users

const registerValidationRules = [
    check('password')
        .notEmpty()
        .withMessage('Password not filled')
        .isLength({ min: 5 })
        .withMessage('Must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('Must contain a number')
        .matches(/[^\w\s]/)
        .withMessage('Must contain a special character')
        .matches(/[A-Z]/)
        .withMessage('Must contain an uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Must contain a lowercase letter'),
    check('email').notEmpty()
        .withMessage('Email not filled').isEmail().withMessage('Not an email'),
    check('username').notEmpty()
        .withMessage('Username not filled')
]

const emailOrUsernameRules = [
    check('email')
        .notEmpty()
        .withMessage('Email not filled')
        .isEmail()
        .withMessage('Not an email'),
    check('username')
        .notEmpty()
        .withMessage('Username not filled')
]

const loginValidationRules = [
    check('password')
        .notEmpty()
        .withMessage('Password not filled')
]

// Register user
userRouter.post('/', registerValidationRules, createUser);

userRouter.get('/', getUsers);

userRouter.post('/login', oneOf(emailOrUsernameRules), loginValidationRules, login);


export default userRouter;