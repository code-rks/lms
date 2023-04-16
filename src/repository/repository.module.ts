import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './auth/auth.schema';
import { IAuthRepository } from 'src/auth/interface/IAuthRepository';
import { MongoAuthRepository } from './auth/auth.repository';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ignoreUndefined: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  providers: [
    MongoAuthRepository,
    {
      provide: IAuthRepository,
      useClass: MongoAuthRepository,
    },
  ],
  exports: [MongoAuthRepository, IAuthRepository],
})
export class RepositoryModule {}
