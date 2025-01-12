import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { HashService } from 'src/common/hash/hash.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { describe, expect, it } from 'vitest';

describe('Auth Service', () => {
  const authService = new AuthService(
    new UserService(new PrismaService()),
    new HashService(),
    new JwtService({ secret: process.env.JWT_HASH }),
  );
  const userService = new UserService(new PrismaService());
  const data: SignupDto = {
    name: 'José Batista Pedroso',
    email: 'jbpedroso@gmail.com.br',
    password: 'bg1293fd0122',
    redoPassword: 'bg1293fd0122',
    phone: '62999855878',
  };
  it('shold create a new user and return it', async () => {
    const signedUp = await authService.signup(data);
    expect(signedUp.email).toBe(data.email);
  });
  it('shold successfully signin as user', async () => {
    const signedIn = await authService.signin({
      email: data.email,
      password: data.password,
    });
    expect(signedIn.access_token).toBeDefined();
  });
  it('removes the created user', async () => {
    await userService.remove({ email: data.email });
  });
});
