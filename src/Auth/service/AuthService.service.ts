import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { SignInUserDto } from '../interface/dto/signIn-userService';
import { JwtService } from '@nestjs/jwt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpUserDto } from '../interface/dto/signUp-userService';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
    private jwtService: JwtService,
  ) {}

  signUp(profile: SignUpUserDto): Promise<UserDocument> {
    const book = new this.userModel(profile);
    return book.save();
  }

  async signIn(profile: SignInUserDto): Promise<any> {
    const user = await this.userModel.findOne({ email: profile.email }).exec();
    // if (user) {
    //   return user;
    // }
    // return null;
    if (user?.password !== profile.password) {
      throw new UnauthorizedException();
    }
    // const {user, ...result } = user;
    console.log(user);
    const payload = {
      email: user.email,
      firstName: user.firstName,
      id: user._id.toString(),
    };
    return this.jwtService.sign(payload);
  }

  // signIn(payload: any) {
  //   return this.jwtService.sign(payload);
  // }
}
