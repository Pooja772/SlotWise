import { Request, Response } from 'express';
import userService from '../services/users';
import { respHandler } from '../../../res-handler';
import { RESPONSE_STATUS } from '../../../res-handler/constants';

export class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const result = await userService.createUser(req);
            respHandler.apiResponseSuccess(res, result, RESPONSE_STATUS.SUCCESS_CREATED, 'User created successfully');
        } catch (err) {
            respHandler.sendError(res, err);
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const result = await userService.getUserById(req);
            respHandler.apiResponseSuccess(res, result, RESPONSE_STATUS.SUCCESS, 'User fetched successfully');
        } catch (err) {
            respHandler.sendError(res, err);
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const result = await userService.getAllUsers();
            respHandler.apiResponseSuccess(res, result, RESPONSE_STATUS.SUCCESS, 'All users fetched successfully');
        } catch (err) {
            respHandler.sendError(res, err);
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const result = await userService.updateUser(req);
            respHandler.apiResponseSuccess(res, result, RESPONSE_STATUS.SUCCESS, 'User updated successfully');
        } catch (err) {
            respHandler.sendError(res, err);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const result = await userService.deleteUserById(req);
            respHandler.apiResponseSuccess(res, result, RESPONSE_STATUS.SUCCESS, 'User deleted successfully');
        } catch (err) {
            respHandler.sendError(res, err);
        }
    }
}

export default new UserController();
