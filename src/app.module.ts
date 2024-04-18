import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    JwtModule.register({
      global: true,
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
