import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    const alreadyExists = await this.databaseService.user.findUnique({
      where: { email },
    });
    if (alreadyExists) {
      throw new UnauthorizedException('User already exist');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const data: Prisma.UserCreateInput = {
      email: email,
      password: hashedPassword,
      lastLoginDate: new Date(),
    };
    const result = await this.databaseService.user.create({
      data: data,
      select: {
        email: true,
      },
    });
    return {
      message: 'new user registered successfully',
      data: result,
    };
  }

  async login(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = await this.jwtService.signAsync({ email });
    return {
      message: 'login successfully',
      data: {
        accessToken: accessToken,
      },
    };
  }
}
