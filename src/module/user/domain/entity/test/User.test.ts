import { User } from './../User';

describe('Tests for user', () => {
  test('should create and return a new user', async () => {
    const userData = { email: 'example@abc.com', name: 'john' };
    const user = User.create(userData);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user.getName).toMatch('john');
    expect(user.getEmail).toMatch('example@abc.com');
  });
});
