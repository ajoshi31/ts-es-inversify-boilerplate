import mongoose from 'mongoose';
import { MongoDbConnection } from './Database';

describe('MongoDbConnection', () => {
  beforeAll(async () => {
    await MongoDbConnection.initConnection();
  });

  afterAll(async () => {
    await MongoDbConnection.disconnect();
  });

  describe('initConnection', () => {
    it('should connect to the database', async () => {
      const isConnected = mongoose.connection.readyState === 1;
      expect(isConnected).toBe(true);
    });
  });

  describe('disconnect', () => {
    it('should disconnect from the database', async () => {
      await MongoDbConnection.disconnect();
      const isConnected = mongoose.connection.readyState !== 1;
      expect(isConnected).toBe(true);
    });
  });
});
