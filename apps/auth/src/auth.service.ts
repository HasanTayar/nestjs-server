import { Injectable } from '@nestjs/common';
import { UsersDocument } from './users/models/users.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: UsersDocument, response: Response) {
    const tokenPayLoad = {
      userId: user._id.toHexString(),
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION_TIME'),
    );
    const token = this.jwtService.sign(tokenPayLoad);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
