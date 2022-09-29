import express from 'express';
import { createUser, getUsers } from "../controller/userController";

const userRouter:express.Router = express.Router();

// Users
userRouter.post('/', createUser);

userRouter.get('/', getUsers);


export default userRouter;