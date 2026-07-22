import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { type JwtPayload } from '../../types/jwt.payload';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? '',
    });
  }

  // Runs automatically once the signature is successfully verified
  validate(payload: JwtPayload): JwtPayload {
    if (!payload) {
      throw new UnauthorizedException();
    }
    return { userId: payload.userId, email: payload.email };
  }
}
