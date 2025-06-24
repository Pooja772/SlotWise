import logger from "../../../utility/logger";
import Slots from "../models/slots";

export class SlotService {
  async generateNextDaySlots() {
    try {
      let generatedSlots: any[] = [];
      const today = new Date();
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + 7); // 7th day from today

      if (targetDate.getDay() === 0 || targetDate.getDay() === 6) {
        // skip Sunday/Saturday
        logger.info("Skipping weekend slot generation.");
        return;
      }

      const dateStr = targetDate.toISOString().split("T")[0];

      const existing = await Slots.findOne({ date: dateStr });
      if (existing) {
        logger.info(`Slots for ${dateStr} already exist.`);
        return;
      }

      // Generate slots for this day
      for (let hour = 9; hour < 17; hour++) {
        for (let minute = 0; minute < 60; minute += 60) {
          const timeStr = `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;
          const datetime = `${dateStr}T${timeStr}:00`;
          const slot = new Slots({
            date: dateStr,
            time: timeStr,
            datetime,
            available: true,
          });
          generatedSlots.push(slot);
          await slot.save();
        }
      }
      logger.info(`Slots generated for ${dateStr}`);
      return generatedSlots;
    } catch (error) {
      throw error;
    }
  }

  getAllSlots = async () => {
    const now = new Date();
    const istOffset = 5.5 * 60; // IST is UTC +5:30 in minutes
    const istTime = new Date(now.getTime() + istOffset * 60000);
    console.log(
      "IST ISO String:",
      istTime.toISOString().replace("Z", "+05:30")
    );
    const dateTime = istTime.toISOString().replace("Z", "+05:30")

    return await Slots.find({
      datetime: { $gte: dateTime },
    });
  };
}

export default new SlotService();
