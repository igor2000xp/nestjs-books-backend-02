import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface PayloadJWTInterface {
  userId: string;
  email: string;
}

export interface ReqUserPayLoadJWTInterface {
  user: PayloadJWTInterface;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: jwtConstants.secret,
      // secretOrKey: process.env.JWT_SECRET,
      secretOrKey: configService.get('apiSettings.JWT_SECRET'),
    });
  }

  async validate(payload: PayloadJWTInterface) {
    return { userId: payload.userId, email: payload.email };
  }
}
