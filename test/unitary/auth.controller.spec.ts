import { JwtService } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { HashService } from 'src/common/hash/hash.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { describe, expect, it } from 'vitest';

describe('AuthController', () => {
  const authController = new AuthController(
    new AuthService(
      new UserService(new PrismaService()),
      new HashService(),
      new JwtService({ secret: process.env.JWT_HASH }),
    ),
  );
  const userService = new UserService(new PrismaService());
  const data: SignupDto = {
    name: 'Joaquim Gonçalves Silva',
    email: 'jgs@gmail.com.br',
    password: 'bg1293fd0122',
    redoPassword: 'bg1293fd0122',
    phone: '62999833878',
  };
  it('shold do the signup on controller', async () => {
    const singedUp = await authController.signup(data);
    expect(singedUp.name).toBe(singedUp.name);
  });
  it('shold do the signin on controller', async () => {
    const signedIn = await authController.signin({
      email: data.email,
      password: data.password,
    });
    expect(signedIn.access_token).toBeDefined();
  });
  it('shold validate if accessToken is valid', async () => {
    const signedIn = await authController.signin({
      email: data.email,
      password: data.password,
    });
    const verifyToken = await authController.verifyToken(signedIn.access_token);
    expect(verifyToken).toBeTruthy();
  });
  it('removes the created user', async () => {
    await userService.remove({ email: data.email });
  });
});
