import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { HashService } from 'src/common/hash/hash.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private user: UserService,
    private hash: HashService,
    private jwt: JwtService,
  ) {}
  async signup(data: SignupDto) {
    const { name, email, password, phone } = data;
    this.arePasswordsEqual(data);
    const hashed = await this.hash.hashPassword(password);
    const newUser: CreateUserDto = {
      name,
      email,
      password: hashed,
      phone,
    };
    return this.user.create(newUser);
  }
  async signin(data: SigninDto) {
    const user = await this.user.findOne({ email: data.email });
    await this.passwordIsValid(data.password, user.password);
    this.isUserActive(user);
    return this.generateToken(user);
  }
  async verifyToken(accessToken: string): Promise<boolean> {
    const payload = await this.jwt.verifyAsync(accessToken, {
      secret: process.env.JWT_HASH,
    });
    return payload;
  }
  arePasswordsEqual(data: SignupDto): void {
    if (data.password !== data.redoPassword) {
      throw new BadRequestException('Passwords are different');
    } else return;
  }
  async passwordIsValid(password: string, hash: string): Promise<void> {
    const compare = await this.hash.comparePassword(password, hash);
    if (!compare) {
      throw new BadRequestException('Incorrect Credentials');
    }
  }

  isUserActive(data: User): void {
    if (!data.active) {
      throw new UnauthorizedException(
        'You are not allowed to be accessing the sys',
      );
    }
  }

  async generateToken(data: User) {
    const payload = {
      id: data.id,
      name: data.name,
      role: data.role,
      email: data.email,
    };
    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }
}
