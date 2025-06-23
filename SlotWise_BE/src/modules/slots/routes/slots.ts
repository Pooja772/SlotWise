import { Router } from 'express';
import SlotController from '../controllers/slots';
import { Validator } from '../../../utility/validator';
import { createSlotValidation } from '../validators/slotsValidation';
import { validateToken } from '../../../utility/validateToken';

const slotRouter = Router();

slotRouter.post('/slot',validateToken, SlotController.generateSlots);
slotRouter.get('/slots',validateToken, SlotController.getSlots);

export default slotRouter;
