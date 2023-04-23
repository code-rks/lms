import { Body, Headers, Request, Controller, Get, Param, Post, Put, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuth } from './interface/IAuth';
import { CreateUserDTO } from './DTO/CreateUserDTO';
import { LoginDTO } from './DTO/LoginDTO';
import { IToken } from './interface/IToken';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserId } from 'src/common/decorators/userid.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { Token } from 'src/common/decorators/token.decorator';
import { Constants } from 'src/common/Constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  @Public()
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

  @Put('/user')
  async updateUser(
    @UserId() userId: string,
    @Body() auth: IAuth,
  ): Promise<IAuth> {
    const user = await this.authService.updateUser(userId, auth);
    return user;
  }

  @Post('/user/login')
  @Public()
  async loginUser(@Body() loginDto: LoginDTO): Promise<IToken> {
    const token = await this.authService.loginUser(loginDto);
    return token;
  }

  @Get('/me')
  async fetchUser(@UserId() userId: string): Promise<IAuth> {
    if(!userId) throw new HttpException('Unable to extract userId from request', HttpStatus.BAD_REQUEST);
    return await this.authService.getUser(userId);
  }

  @Public()
  @Post('/token/refresh')
  async refreshToken(@Token(Constants.REFRESH_TOKEN_HEADER_NAME) token: string): Promise<IToken> {
    if(!token) throw new HttpException('Unable to extract refresh token from request', HttpStatus.BAD_REQUEST)
    return await this.authService.refreshTokens(token);
  }
}
