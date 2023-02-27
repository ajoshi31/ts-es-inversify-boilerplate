import { inject, injectable } from 'inversify';
import TYPES from '@ioc/constant/Types';
import { AppError } from '@core/error/AppError';
import { Either, left, Result, right } from '@core/result/Result';
import { UserMap } from '@user-module/mapper/UserMapper';
import { IUserRepository } from '@user-module/domain/repository/IUserRepository';
import { UserDTO } from '../dtos/UserDto';
import { UseCase } from '@core/usecase/UseCase';
import { UpdateUserDto } from '../dtos/UpdateUserDto';

type UserResponse = Either<AppError.UnexpectedError, Result<UserDTO>>;

@injectable()
export class UpdateUserUseCase
  implements UseCase<UserDTO, Promise<UserResponse>>
{
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  public async execute(userDto: UpdateUserDto): Promise<UserResponse> {
    try {
      const id = userDto._id;
      const user = userDto;
      const result = await this._userRepository.update(id, user);
      const userDTO = UserMap.fromPersistenceToDTO(result);
      return right(Result.ok<UserDTO>(userDTO));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
