import { CreateUserDto } from '../../src/user/dto/create-user.dto';
import { UpdateUserDto } from '../../src/user/dto/update-user.dto';
import { UserService } from '../../src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { describe, it, expect } from 'vitest';

describe('UserService', async () => {
  const userService: UserService = new UserService(new PrismaService());
  const data: CreateUserDto = {
    name: 'João Ferreira',
    email: 'joão@ferreira.com.br',
    password: 'bg1293fd0122',
    phone: '62999877878',
  };
  describe('create user', () => {
    it('shold create a user', async () => {
      const newUser = await userService.create(data);
      expect(newUser.id).toBeDefined();
    });
    it('shold return the user', async () => {
      const user = await userService.findOne({ email: data.email });
      expect(user.email).toBe(data.email);
    });
    it('shold find users', async () => {
      const users = userService.findAll();
      expect(await users).toBeDefined();
    });
    it('shold update a user', async () => {
      const toUpdate: UpdateUserDto = {
        name: 'João Pedroso',
      };
      const updated = await userService.update(
        { email: data.email },
        { ...toUpdate },
      );
      expect(updated.name).toBe('João Pedroso');
    });
    it('shold delete a user', async () => {
      const deleted = await userService.remove({ email: data.email });
      expect(deleted).toBeDefined();
    });
  });
});
