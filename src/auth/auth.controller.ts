import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuth } from './interface/IAuth';

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
}
