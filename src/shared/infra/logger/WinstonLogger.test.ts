import { Logger } from 'winston';
import { winstonLoggerInstance } from './WinstonLoggerImpl';
import { logger } from '@core/logger/Logger';

describe('Winston Logger Adapter', () => {
  let mockLogger: any;
  beforeEach(() => {
    mockLogger = {
      log: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      silly: jest.fn(),
      trace: jest.fn(),
      fatal: jest.fn()
    } as unknown as Logger;
    (winstonLoggerInstance as any).logger = mockLogger;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('silly', () => {
    it('calls logger.log with level "silly", message, and metadata', () => {
      const msg = 'test message';
      const meta = { foo: 'bar' };
      winstonLoggerInstance.silly(msg, meta);
      expect(mockLogger.log).toHaveBeenCalledWith('silly', msg, meta);
    });
  });

  describe('trace', () => {
    it('calls logger.log with level "trace", message, and metadata', () => {
      const msg = 'test message';
      const meta = { foo: 'bar' };
      winstonLoggerInstance.trace(msg, meta);
      expect(mockLogger.log).toHaveBeenCalledWith('trace', msg, meta);
    });
  });

  describe('debug', () => {
    it('calls logger.debug with message and metadata', () => {
      const msg = 'test message';
      const meta = { foo: 'bar' };
      winstonLoggerInstance.debug(msg, meta);
      expect(mockLogger.debug).toHaveBeenCalledWith(msg, meta);
    });
  });

  describe('info', () => {
    it('calls logger.info with message and metadata', () => {
      const msg = 'test message';
      const meta = { foo: 'bar' };
      winstonLoggerInstance.info(msg, meta);
      expect(mockLogger.info).toHaveBeenCalledWith(msg, meta);
    });
  });

  describe('warn', () => {
    it('calls logger.warn with message and metadata', () => {
      const msg = 'test message';
      const meta = { foo: 'bar' };
      winstonLoggerInstance.warn(msg, meta);
      expect(mockLogger.warn).toHaveBeenCalledWith(msg, meta);
    });
  });

  describe('error', () => {
    it('calls logger.error with message and metadata', () => {
      const msg = 'test message';
      const meta = { foo: 'bar' };
      winstonLoggerInstance.error(msg, meta);
      expect(mockLogger.error).toHaveBeenCalledWith(msg, meta);
    });
  });

  describe('fatal', () => {
    it('calls logger.log with level "fatal", message, and metadata', () => {
      const msg = 'test message';
      const meta = { foo: 'bar' };
      winstonLoggerInstance.fatal(msg, meta);
      expect(mockLogger.log).toHaveBeenCalledWith('fatal', msg, meta);
    });
  });
});
