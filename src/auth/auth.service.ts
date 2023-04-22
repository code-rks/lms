import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from './interface/IAuthRepository';
import { IAuth } from './interface/IAuth';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDTO } from './DTO/CreateUserDTO';

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

  createUser = async (userDTO: CreateUserDTO): Promise<IAuth> => {
    let user: IAuth = {
      userId: uuidv4(),
      firstName: userDTO.firstName,
      lastName: userDTO.lastName,
      phoneNumber: userDTO.phoneNumber,
      email: userDTO.email,
      username: userDTO.email,
      password: userDTO.password,
    }
    return await this.authRepository.createUser(user);
  };

  getUser = async (userId: string): Promise<IAuth> => {
    return await this.authRepository.getUser(userId);
  }

  updateUser = async (userId: string, user: IAuth): Promise<IAuth> => {
    user.username = user.email;
    return await this.authRepository.updateUser(userId, user);
  }
}
