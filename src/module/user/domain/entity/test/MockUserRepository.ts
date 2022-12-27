import { UserDTO } from '../../../application/dtos/UserDto';

export class MockUserRepository {
  private _id!: string;
  private name!: string;
  private email!: string;

  public async createUser(userDto: UserDTO): Promise<any> {
    try {
      this.name = userDto.name;
      this.email = userDto.email;
      this._id = JSON.stringify(userDto);
      return Promise.resolve({
        _id: this._id,
        name: this.name,
        email: this.email
      });
    } catch (err) {
      return Promise.reject({ err: 'user not created' });
    }
  }

  public async updateUser(_id: string, userDto: UserDTO): Promise<any> {
    if (_id === this._id) {
      this.name = userDto.name;
      this.email = userDto.email;
      return Promise.resolve({
        _id: this._id,
        name: this.name,
        email: this.email
      });
    }
    return Promise.reject({ err: 'user not updated' });
  }
}
