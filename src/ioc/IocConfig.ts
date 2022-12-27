import { Container } from 'inversify';

import '../module/user/infrastructure/routers/UserRouter';
import { UserService } from '@user-module/application/service/UserService';
import { UserRepository } from '@user-module/infrastructure/repository-implementation/UserRepository';
import { IUserRepository } from '@user-module/domain/repository/IUserRepository';
import { CreateUserController } from '@user-module/infrastructure/controller/CreateUserController';
import { UpdateUserController } from '@user-module/infrastructure/controller/UpdateUserController';
import TYPES from './constant/Types';
import { errorHandler } from '@core/error/ErrorHandler';

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
  } catch (err: unknown) {
    errorHandler.handleError(err as Error);
  }

  return container;
};

export { InversifyConfigContainer };
