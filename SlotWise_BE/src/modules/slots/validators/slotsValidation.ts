import { body } from 'express-validator';

export const createSlotValidation = [
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be in ISO8601 format'),

    body('time')
        .notEmpty().withMessage('Time is required')
        .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/).withMessage('Time must be in HH:mm format'),

    body('datetime')
        .notEmpty().withMessage('Datetime is required')
        .isISO8601().withMessage('Datetime must be in ISO8601 format'),

    body('available')
        .isBoolean().withMessage('Available must be a boolean')
];
