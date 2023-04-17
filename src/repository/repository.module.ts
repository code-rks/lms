import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './auth/auth.schema';
import { IAuthRepository } from 'src/auth/interface/IAuthRepository';
import { MongoAuthRepository } from './auth/auth.repository';
import { ILeadRepository } from 'src/lead/interface/ILeadRepository';
import { MongoLeadRepository } from './lead/lead.repository';
import { Lead, LeadSchema } from './lead/lead.schema';
import { Student, StudentSchema } from './student/student.schema';
import { IStudentRepository } from 'src/student/interface/IStudentRepository';
import { MongoStudentRepository } from './student/student.repository';
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
    MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }]),
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  providers: [
    {
      provide: IAuthRepository,
      useClass: MongoAuthRepository,
    },
    {
      provide: ILeadRepository,
      useClass: MongoLeadRepository,
    },
    {
      provide: IStudentRepository,
      useClass: MongoStudentRepository,
    },
  ],
  exports: [IAuthRepository, ILeadRepository, IStudentRepository],
})
export class RepositoryModule {}
