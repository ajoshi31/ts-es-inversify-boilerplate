import { MockUserRepository } from '../../../domain/entity/test/MockUserRepository';

describe('Tests for user', () => {
  let _id: string;
  const userService = new MockUserRepository();
  test('should create a new user', async () => {
    const userData = { email: 'example@abc.com', name: 'john' };
    const res = userService.createUser(userData);
    res.then((user) => {
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      _id = user._id;
    });
  });

  test('should update the user', async () => {
    const userData = { email: 'xyz@abc.com', name: 'david' };
    const res = userService.updateUser(_id, userData);
    res.then((user) => {
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
    });
  });

  test('should not update the user when wrong _id is provided', async () => {
    const userData = { email: 'xyz@abc.com', name: 'david' };
    const res = userService.updateUser((_id = 'some_wrong_id'), userData);
    res.then().catch((user) => {
      expect(user).toHaveProperty('err');
    });
  });
});
