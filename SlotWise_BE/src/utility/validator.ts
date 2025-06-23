import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Exception, respHandler } from '../res-handler';
import { ERROR_TYPE, RESPONSE_STATUS } from '../res-handler/constants';

export class Validator {
    static makeValidation(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const extractedErrors = errors.array();

                const errorMessage = extractedErrors[0]?.msg || 'Invalid request data';
    
                throw new Exception(
                    RESPONSE_STATUS.BAD_REQUEST,
                    ERROR_TYPE.BAD_REQUEST,
                    errorMessage
                );
            }
            return next();
        } catch (error) {
            return respHandler.sendError(res, error);
        }
    }
}