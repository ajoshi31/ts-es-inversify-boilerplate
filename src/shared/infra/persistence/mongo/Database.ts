import { logger } from '@core/logger/LoggerV1';
import mongoose from 'mongoose';

export class MongoDbConnection {
  public static async initConnection() {
    // environment variables
    const MONGO_CONTAINER_NAME = process.env.MONGO_HOST || 'localhost';
    const MONGO_URI = `mongodb://${MONGO_CONTAINER_NAME}:27017/todo`;
    await MongoDbConnection.connect(MONGO_URI);
  }

  public static async connect(connStr: string) {
    return mongoose
      .connect(connStr, { retryWrites: true, w: 'majority' })
      .then(() => {
        logger.info('Mongo connected successfully.');
      })
      .catch((error) => {
        logger.error('Error connecting to database:', error);
        return process.exit(1);
      });
  }

  public static setAutoReconnect() {
    const MONGO_CONTAINER_NAME = process.env.MONGO_HOST || 'localhost';
    const MONGO_URI = `mongodb://${MONGO_CONTAINER_NAME}:27017/todo`;
    mongoose.connection.on('disconnected', () =>
      MongoDbConnection.connect(MONGO_URI)
    );
  }

  public static async disconnect() {
    await mongoose.connection.close();
  }
}
