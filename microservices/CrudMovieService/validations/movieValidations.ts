import { check, body, query, param, validationResult } from 'express-validator/check';


export const movieCreateValidation = [
    check('title')
        .notEmpty()
        .withMessage('title not filled'),
    check('country')
        .notEmpty()
        .withMessage('Country not filled'),
    check('country')
        .notEmpty()
        .withMessage('Country not filled')
        .isArray()
        .withMessage('Would be array of string'),
    check('review')
        .isNumeric()
        .withMessage('review would be a number'),
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