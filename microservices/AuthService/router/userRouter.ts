import express from 'express';
import { createUser, deleteUserById, getUserById, getUsers, login, updateUserEmail, updateUserPassword, updateUserUsername } from "../controller/userController";
const { check, oneOf } = require('express-validator');
const auth = require('../middlewares/auth');

// Express validators

const userRouter:express.Router = express.Router();

const passwordValidator = [
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
]

const emailValidator = [
    check('email').notEmpty()
        .withMessage('Email not filled').isEmail().withMessage('Not an email')
]

const usernameValidator = [
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
userRouter.post('/', passwordValidator, emailValidator, usernameValidator, createUser);

userRouter.get('/', auth, getUsers);

userRouter.get('/:id', auth, getUserById);

userRouter.delete('/:id', auth, deleteUserById);

// Update user username
userRouter.put('/updateUsername/:id', usernameValidator, auth, updateUserUsername);

// Update user email
userRouter.put('/updateEmail/:id', emailValidator, auth, updateUserEmail);

// Update user password
userRouter.put('/updatePassword/:id', passwordValidator, auth, updateUserPassword);

userRouter.post('/login', oneOf(emailOrUsernameRules), loginValidationRules, login);

export default userRouter;