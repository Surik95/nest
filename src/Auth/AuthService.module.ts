import { Module } from '@nestjs/common';
import { AuthController } from './controllers/AuthController.controller';
import { AuthService } from './service/AuthService.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: `${process.env.JWT_CONSTANTS}`,
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
