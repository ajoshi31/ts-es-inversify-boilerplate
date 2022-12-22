const TYPES = {
  UserService: Symbol.for('UserService'),
  IUserRepository: Symbol.for('IUserRepository'),
  IBaseRepository: Symbol.for('IBaseRepository'),
  CreateUserController: Symbol.for('CreateUserController'),
  UpdateUserController: Symbol.for('UpdateUserController')
};

export default TYPES;
