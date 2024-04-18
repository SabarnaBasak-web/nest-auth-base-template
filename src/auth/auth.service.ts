import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async signUpUser(createUser: CreateUserDto) {
    const { email, password, firstName, lastName } = createUser;
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('hashed password', hashedPassword);
    return await this.prismaService.users.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });
  }

  async loginUser(loginUser: LoginDto) {
    const { email, password } = loginUser;

    const foundUser = await this.prismaService.users.findFirst({
      where: {
        email,
      },
    });

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    const passwordVerify = await bcrypt.compare(password, foundUser.password);

    if (!passwordVerify) {
      throw new UnauthorizedException();
    }

    const token = await this.signedToken(foundUser.id, foundUser.email);
    return { access_token: token };
  }

  signedToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    return this.jwt.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '15m',
    });
  }
}
