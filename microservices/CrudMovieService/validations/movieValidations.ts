import { check } from 'express-validator';


export const movieCreateValidation = [

    check('userId')
        .notEmpty()
        .withMessage('userId not filled'),
    check('title')
        .notEmpty()
        .withMessage('title not filled'),
    check('date')
        .notEmpty()
        .withMessage('date not filled'),
    check('rating')
        .notEmpty()
        .withMessage('rating not filled'),
    check('description')
        .notEmpty()
        .withMessage('Not filled'),
    check('image')
        .notEmpty()
        .withMessage('image not filled')

]

export const movieUpdateValidation = [
    check('movieId')
        .notEmpty()
        .withMessage('Not filled')
        .isNumeric()
        .withMessage('To be Number value')
]