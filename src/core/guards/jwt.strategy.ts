import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as process from 'process';
// import { jwtConstants } from './constants';

export interface PayloadJWTInterface {
  userId: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: jwtConstants.secret,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: PayloadJWTInterface) {
    return { userId: payload.userId, email: payload.email };
  }
}
