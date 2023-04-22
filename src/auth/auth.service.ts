import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from './interface/IAuthRepository';
import { IAuth } from './interface/IAuth';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDTO } from './DTO/CreateUserDTO';
import { LoginDTO } from './DTO/LoginDTO';
import { InvalidCredentialsException } from 'src/common/exceptions/AuthExceptions';
import { sign } from 'jsonwebtoken';
import { IConfiguration } from 'src/common/interface/IConfiguration';
import { IToken } from './interface/IToken';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IAuthRepository) private authRepository: IAuthRepository,
    @Inject(IConfiguration) private configuration: IConfiguration,
  ) {}
  isReady = (): string => {
    return 'Auth module is ready';
  };

  listAllUsers = async (): Promise<IAuth[]> => {
    const users = await this.authRepository.listUsers();
    return users;
  };

  createUser = async (userDTO: CreateUserDTO): Promise<IAuth> => {
    const user: IAuth = {
      userId: uuidv4(),
      firstName: userDTO.firstName,
      lastName: userDTO.lastName,
      phoneNumber: userDTO.phoneNumber,
      email: userDTO.email,
      username: userDTO.email,
      password: userDTO.password,
    };
    return await this.authRepository.createUser(user);
  };

  getUser = async (userId: string): Promise<IAuth> => {
    return await this.authRepository.getUser(userId);
  };

  updateUser = async (userId: string, user: IAuth): Promise<IAuth> => {
    user.username = user.email;
    return await this.authRepository.updateUser(userId, user);
  };

  loginUser = async (user: LoginDTO): Promise<IToken> => {
    const loggedInUser =
      await this.authRepository.findUserUsingUsernameAndPassword(
        user.username,
        user.password,
      );
    if (loggedInUser == null) throw new InvalidCredentialsException();
    const token: IToken = {
      authToken: this.generateAuthToken(loggedInUser),
      refreshToken: this.generateRefreshToken(loggedInUser),
    };
    return token;
  };

  private generateAuthToken(loggedInUser: IAuth): string {
    return sign(
      {
        userId: loggedInUser.userId,
      },
      this.configuration.jwtAuthSecret,
      {
        expiresIn: this.configuration.jwtAuthExpiry,
      },
    );
  }

  private generateRefreshToken(loggedInUser: IAuth): string {
    return sign(
      {
        userId: loggedInUser.userId,
      },
      this.configuration.jwtRefreshSecret,
      {
        expiresIn: this.configuration.jwtRefreshExpiry,
      },
    );
  }
}
