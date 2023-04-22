import { Injectable } from '@nestjs/common';
import { IConfiguration } from './interface/IConfiguration';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class Configuration implements IConfiguration {
  port: number;
  databaseUrl: string;
  jwtAuthSecret: string;
  jwtAuthExpiry: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiry: string;

  constructor(configService: ConfigService) {
    this.port = configService.get<number>('PORT');
    this.databaseUrl = configService.get<string>('DATABASE_URL');
    this.jwtAuthSecret = configService.get<string>('JWT_AUTH_SECRET');
    this.jwtAuthExpiry = configService.get<string>('JWT_AUTH_EXPIRY');
    this.jwtRefreshSecret = configService.get<string>('REFRESH_AUTH_SECRET');
    this.jwtRefreshExpiry = configService.get<string>('REFRESH_AUTH_EXPIRY');
  }
}
