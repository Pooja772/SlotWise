import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './modules/users/routes/users';
import slotRoutes from './modules/slots/routes/slots';
import bookingRoutes from './modules/booking/routes/booking';
import {initialSlotSetup ,generateDailySlots} from './utility/cron';
import authRoutes from './modules/auth/routes/auth';

class ServerSetup {
  expressInstance: express.Application;

  constructor() {
    this.expressInstance = express();
    this.middlewareSetUp();
    this.routingSetUp();
    this.cronSetUp();
  }

  private middlewareSetUp() {
    // Enable CORS (Cross-Origin Resource Sharing)
    this.expressInstance.use(cors());
    this.expressInstance.use(bodyParser.urlencoded({ extended: true }));
    this.expressInstance.use(bodyParser.json());
  }

  private routingSetUp() {
    // Use each module's routes
    this.expressInstance.use('/api/v1/', userRoutes);
    this.expressInstance.use('/api/v1/', slotRoutes);
    this.expressInstance.use('/api/v1/', bookingRoutes);
    this.expressInstance.use('/api/v1/', authRoutes);
  }

  private cronSetUp() {
    generateDailySlots();
  }

  public async initializeServer() {
    await initialSlotSetup();
  }
}

export default ServerSetup;
