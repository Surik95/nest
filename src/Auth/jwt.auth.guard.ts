import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  public handleRequest(err: any, user: any, info: any) {
    console.log(user);
    if (err) {
      throw err;
    }
    if (!user) {
      // return 1;
      throw new UnauthorizedException();
    }
    return user;
  }
}
