import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from './interface/IAuthRepository';
import { IAuth } from './interface/IAuth';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IAuthRepository)
    private authRepository: IAuthRepository,
  ) {}
  isReady = (): string => {
    return 'Auth module is ready';
  };

  listAllUsers = async (): Promise<IAuth[]> => {
    const users = await this.authRepository.listUsers();
    return users;
  };
}
