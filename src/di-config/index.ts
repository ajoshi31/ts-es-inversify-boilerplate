import { Container } from 'inversify';
import TYPES from '../constant/types';
import { UserService } from '../module/service/user';
import './../module/controller/user';

/**
 *
 * @returns
 */
const InversifyConfigContainer = async () => {
  const container = new Container();

  try {
    await container.bind<UserService>(TYPES.UserService).to(UserService);
  } catch (err: any) {
    // logger.error(err);
  }

  return container;
};

export { InversifyConfigContainer };
