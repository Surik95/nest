import { Module } from '@nestjs/common';
import { BookModule } from './BookService/BookService.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/AuthService.module';
// import { JwtStrategy } from './Auth/strategy/jwt.strategy';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    BookModule,
    AuthModule,
  ],
})
export class AppModule {}
