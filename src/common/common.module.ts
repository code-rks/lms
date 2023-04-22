import { Module } from '@nestjs/common';
import { IConfiguration } from './interface/IConfiguration';
import Configuration from './Configuration';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule
  ],
  providers: [
    {
        provide: IConfiguration,
        useClass: Configuration,
    },
  ],
  exports: [IConfiguration],
})
export class CommonModule {}
