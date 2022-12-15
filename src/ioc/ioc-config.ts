import { Container } from 'inversify';
import TYPES from './constant/types';
import '../module/user/routers/user.router';
import { UserService } from '@user-module/application/service/user.service';
import { logger } from '@core/logger/logger';
import { UserRepository } from '@user-module/infrastructure/repositoryImplementation/user.repository';
import { IUserRepository } from '@user-module/domain/repository/iuser.repository.interaface';
import { CreateUserController } from '@user-module/infrastructure/controller/create.user.controller';
import { UpdateUserController } from '@user-module/infrastructure/controller/update.user.controller';

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
