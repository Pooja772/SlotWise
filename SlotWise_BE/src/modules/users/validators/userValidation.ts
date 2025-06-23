import { body } from 'express-validator';

export const createUserValidation = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
        
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/).withMessage('Password must contain at least one special character'),

    body('roleId')
        .notEmpty().withMessage('Role ID is required')
        .isMongoId().withMessage('Invalid Role ID format')
];
