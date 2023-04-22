import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuth } from './interface/IAuth';
import { CreateUserDTO } from './DTO/CreateUserDTO';
import { LoginDTO } from './DTO/LoginDTO';
import { IToken } from './interface/IToken';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  async isReady(): Promise<any> {
    return {
      msg: this.authService.isReady(),
    };
  }

  @Get('/users')
  async listAllUsers(): Promise<IAuth[]> {
    const users = await this.authService.listAllUsers();
    return users;
  }

  @Post('/user')
  async createUser(@Body() user: CreateUserDTO): Promise<IAuth> {
    return await this.authService.createUser(user);
  }

  @Get('/user')
  async getUser(@Param('userId') userId: string): Promise<IAuth> {
    const user = await this.authService.getUser(userId);
    return user;
  }

  @Put('/user/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() auth: IAuth,
  ): Promise<IAuth> {
    const user = await this.authService.updateUser(userId, auth);
    return user;
  }

  @Post('/user/login')
  async loginUser(@Body() loginDto: LoginDTO): Promise<IToken> {
    const token = await this.authService.loginUser(loginDto);
    return token;
  }
}
