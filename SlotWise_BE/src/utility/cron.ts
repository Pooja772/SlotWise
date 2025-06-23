// utils/cron.ts
import cron from 'node-cron';
import slotService from '../modules/slots/services/slots';
import Slots from '../modules/slots/models/slots';
import logger from './logger';

// Cron job that creates slot for first seven days from 9am to 5pm
export const initialSlotSetup = async() => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    const existing = await Slots.findOne({ date: dateStr });
    if (existing) {
        logger.info("Slots already initialized.");
        return;
    }

    logger.info("No slots found. Generating slots for the next 7 days...");

    for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(today.getDate() + day);

        if (date.getDay() === 0 || date.getDay() === 6) continue; // skip weekends

        const dateStr = date.toISOString().split('T')[0];

        for (let hour = 9; hour < 17; hour++) {
            for (let minute = 0; minute < 60; minute += 60) {
                const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const datetime = `${dateStr}T${timeStr}:00`;

                const slot = new Slots({ date: dateStr, time: timeStr, datetime, available: true });
                await slot.save();
            }
        }
    }
    logger.info(" Initial 7 days slots generated.");
}

//Cron Job that run every day at 12:01 AM which create the next day slots
export const generateDailySlots = () => {
    cron.schedule('1 0 * * *', async () => {
        logger.info('Daily Cron Job Running: Generating next day’s slots if missing...');
        try {
            await slotService.generateNextDaySlots();
            logger.info('Checked and generated next day slots if needed.');
        } catch (error) {
            logger.error('Error in daily slot generation cron:', error);
        }
    });
};