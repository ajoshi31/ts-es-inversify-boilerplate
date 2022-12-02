import { Container } from 'inversify';
import TYPES from './constant/types';
import '../module/user/controller/user';
import { UserService } from '@user-module/service/user';
import { logger } from '@core/logger/logger';
import { IUserRepository } from '@user-module/repository/iuser.repository.interaface';
import { UserRepository } from '@user-module/repositoryImplementation/user.repository';

/**
 *
 * @returns
 */
const InversifyConfigContainer = async () => {
  const container = new Container();

  try {
    await container.bind<UserService>(TYPES.UserService).to(UserService);
    await container
      .bind<IUserRepository>(TYPES.IUserRepository)
      .to(UserRepository);
  } catch (err: any) {
    logger.error(err);
  }

  return container;
};

export { InversifyConfigContainer };
