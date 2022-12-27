import { IUser } from './IUser';

export class User {
  private readonly _id!: string;
  private readonly name!: string;
  private readonly email!: string;

  private constructor(props: IUser) {
    this.email = props.email;
    this.name = props.name;
  }

  get getId(): string {
    return this._id;
  }

  get getName(): string {
    return this.name;
  }

  get getEmail(): string {
    return this.email;
  }

  public static create(props: IUser) {
    const user = new User(props);
    return user;
  }
}
