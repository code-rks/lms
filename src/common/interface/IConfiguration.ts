export interface IConfiguration {
  port: number;
  databaseUrl: string;
  jwtAuthSecret: string;
  jwtAuthExpiry: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiry: string;
}

export const IConfiguration = Symbol('IConfiguration');
