import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';
import { RepositoryModule } from './repository/repository.module';
import { LeadModule } from './lead/lead.module';
import { StudentModule } from './student/student.module';
import { CommonModule } from './common/common.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
    }),
    CommonModule,
    AuthModule,
    TestModule,
    RepositoryModule,
    LeadModule,
    StudentModule,
  ],
  controllers: [],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
