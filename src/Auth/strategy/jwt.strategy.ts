import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/AuthService.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.JWT_CONSTANTS}`,
    });
  }

  public async validate(payload: any) {
    console.log(payload);
    const user = await this.authService.signIn(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
