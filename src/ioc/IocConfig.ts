import { Container } from 'inversify';
import TYPES from './constant/Types';
import '../module/user/infrastructure/routers/UserRouter';
import { UserService } from '@user-module/application/service/UserService';
import { logger } from '@core/logger/Logger';
import { UserRepository } from '@user-module/infrastructure/repository-implementation/UserRepository';
import { IUserRepository } from '@user-module/domain/repository/IUserRepository';
import { CreateUserController } from '@user-module/infrastructure/controller/CreateUserController';
import { UpdateUserController } from '@user-module/infrastructure/controller/UpdateUserController';

const InversifyConfigContainer = async () => {
  const container = new Container();

  try {
    container.bind<UserService>(TYPES.UserService).to(UserService);
    container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
    container
      .bind<CreateUserController>(TYPES.CreateUserController)
      .to(CreateUserController)
      .inSingletonScope();
    container
      .bind<UpdateUserController>(TYPES.UpdateUserController)
      .to(UpdateUserController)
      .inSingletonScope();
  } catch (err: any) {
    logger.error(err);
  }

  return container;
};

export { InversifyConfigContainer };
