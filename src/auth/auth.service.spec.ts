import { AuthService } from './auth.service';
import { IAuth } from './interface/IAuth';
import { IAuthRepository } from './interface/IAuthRepository';
import { any, mock } from 'jest-mock-extended';

describe('AuthService', () => {
  let service: AuthService;
  let authRepository;

  beforeEach(async () => {
    authRepository = mock<IAuthRepository>();
    service = new AuthService(authRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('auth service is returning fine', () => {
    expect(service.isReady()).toEqual('Auth module is ready');
  });

  it('Check List Users', async () => {
    const users: IAuth[] = [
      { username: 'abc', email: 'abc@gmail.com', password: '1234' },
    ];
    authRepository.listUsers
      .calledWith(any())
      .mockReturnValue(Promise.resolve(users));
    const res = await service.listAllUsers();
    expect(res).toMatchObject(users);
  });
});
