import { Container } from 'inversify';
import TYPES from './constant/types';
import '../module/user/controller/user';
import { UserService } from '@user-module/service/user';
import { logger } from '@core/logger/logger';

/**
 *
 * @returns
 */
const InversifyConfigContainer = async () => {
  const container = new Container();

  try {
    await container.bind<UserService>(TYPES.UserService).to(UserService);
  } catch (err: any) {
    logger.error(err);
  }

  return container;
};

export { InversifyConfigContainer };
