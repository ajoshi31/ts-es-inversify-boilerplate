import { Container } from 'inversify';

import '../module/user/infrastructure/routers/UserRouter';
import '../module/user/infrastructure/routers/AuthRoutes';
import { UserService } from '@user-module/application/service/UserService';
import { UserRepository } from '@user-module/infrastructure/repository-implementation/UserRepository';
import { IUserRepository } from '@user-module/domain/repository/IUserRepository';
import { CreateUserController } from '@user-module/infrastructure/controller/CreateUserController';
import { UpdateUserController } from '@user-module/infrastructure/controller/UpdateUserController';
import TYPES from './constant/Types';
import { errorHandler } from '@core/error/ErrorHandler';
import { AuthController } from '../module/user/infrastructure/controller/AuthController';
import { GetUserController } from '@user-module/infrastructure/controller/GetUserController';

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
    container
      .bind<AuthController>(TYPES.AuthController)
      .to(AuthController)
      .inSingletonScope();
    container
      .bind<GetUserController>(TYPES.GetUserController)
      .to(GetUserController)
      .inSingletonScope();
  } catch (err: unknown) {
    errorHandler.handleError(err as Error);
  }

  return container;
};

export { InversifyConfigContainer };
