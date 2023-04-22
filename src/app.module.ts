import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';
import { RepositoryModule } from './repository/repository.module';
import { LeadModule } from './lead/lead.module';
import { StudentModule } from './student/student.module';
import Configuration from './common/Configuration';
import { IConfiguration } from './common/interface/IConfiguration';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      process.env.NODE_ENV == 'dev' || !process.env.NODE_ENV
        ? {
            envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
          }
        : {},
    ),
    CommonModule,
    AuthModule,
    TestModule,
    RepositoryModule,
    LeadModule,
    StudentModule,
  ],
  controllers: [],
  providers: [
  ],
  exports: [],
})
export class AppModule {}
