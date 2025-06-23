import slotService from '../services/slots';
import { Request, Response } from 'express';
import { respHandler } from '../../../res-handler';
import { RESPONSE_STATUS } from '../../../res-handler/constants';

export class SlotController {
    async generateSlots(req: Request, res: Response) {
        try {
            const slots = await slotService.generateNextDaySlots();
            respHandler.apiResponseSuccess(res, slots, RESPONSE_STATUS.SUCCESS, 'Slots generated successfully');
        } catch (error) {
            respHandler.sendError(res, error);
        }
    }

    async getSlots(req: Request, res: Response) {
        try {
            const slots = await slotService.getAllSlots();
            respHandler.apiResponseSuccess(res, slots, RESPONSE_STATUS.SUCCESS, 'Slots fetched successfully');
        } catch (error) {
            respHandler.sendError(res, error);
        }
    }
}

export default new SlotController();