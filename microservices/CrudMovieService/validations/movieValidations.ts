import { check } from 'express-validator';


export const movieCreateValidation = [
    check('title')
        .notEmpty()
        .withMessage('title not filled'),
    check('rating')
        .notEmpty()
        .withMessage('rating not filled'),
    check('description')
        .notEmpty()
        .withMessage('Not filled'),
    // check('image')
    //     .notEmpty()
    //     .withMessage('Not filled')
    //     .isBase64()
    //     .withMessage("image would be Base64")
        
]

export const movieUpdateValidation = [
    check('movieId')
        .notEmpty()
        .withMessage('Not filled')
        .isNumeric()
        .withMessage('To be Number value')
]