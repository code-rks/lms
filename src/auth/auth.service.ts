import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from './interface/IAuthRepository';
import { IAuth } from './interface/IAuth';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDTO } from './DTO/CreateUserDTO';
import { LoginDTO } from './DTO/LoginDTO';
import {
  InvalidCredentialsException,
  InvalidTokenException,
} from 'src/common/exceptions/AuthExceptions';
import * as jwt from 'jsonwebtoken';
import { IConfiguration } from 'src/common/interface/IConfiguration';
import { IToken } from './interface/IToken';
import { TOKEN } from 'src/common/types';
import { InvalidArgumentException } from 'src/common/exceptions/GenericExceptions';

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
      authToken: this.generateAuthToken(loggedInUser.userId),
      refreshToken: this.generateRefreshToken(loggedInUser.userId),
    };
    return token;
  };

  validate = async (authToken: string): Promise<IAuth> => {
    const userId = await this.validateToken(authToken, TOKEN.AUTH);
    return this.getUser(userId);
  };

  validateToken = async (token: string, type: TOKEN): Promise<string> => {
    let decodedToken: any;
    const secret = this.getSecret(type);
    try {
      decodedToken = jwt.verify(token, secret);
    } catch (e) {
      console.error(e);
      throw new InvalidTokenException();
    }
    return decodedToken.userId;
  };

  refreshTokens = async (refreshToken: string): Promise<IToken> => {
    const userId = await this.validateToken(refreshToken, TOKEN.REFRESH);
    return {
      authToken: this.generateAuthToken(userId),
      refreshToken: refreshToken,
    };
  };

  private getSecret(tokenType: TOKEN): string {
    switch (tokenType) {
      case TOKEN.AUTH:
        return this.configuration.jwtAuthSecret;
      case TOKEN.REFRESH:
        return this.configuration.jwtRefreshSecret;
      default:
        throw new InvalidArgumentException('TokenType');
    }
  }

  private generateAuthToken(userId: string): string {
    return jwt.sign(
      {
        userId: userId,
      },
      this.configuration.jwtAuthSecret,
      {
        expiresIn: this.configuration.jwtAuthExpiry,
      },
    );
  }

  private generateRefreshToken(userId: string): string {
    return jwt.sign(
      {
        userId: userId,
      },
      this.configuration.jwtRefreshSecret,
      {
        expiresIn: this.configuration.jwtRefreshExpiry,
      },
    );
  }
}
