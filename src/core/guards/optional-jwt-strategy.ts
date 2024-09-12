import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadJWTInterface } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

export class OptionalJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: jwtConstants.secret,
      secretOrKey: process.env.JWT_SECRET,
      // secretOrKey: configService.get('apiSettings.JWT_SECRET'),
    });
  }

  async validate(payload: PayloadJWTInterface) {
    console.log(payload);
    if (!payload) return null;
    return { userId: payload.userId, email: payload.email };
  }
}
