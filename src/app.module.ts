import { Module } from '@nestjs/common';
import { BookModule } from './BookService/BookService.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/AuthService.module';
import { JwtStrategy } from './Auth/strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    BookModule,
    AuthModule,
  ],
  providers: [AppController, JwtStrategy],
})
export class AppModule {}
