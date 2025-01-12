import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from '../../src/user/user.controller';
import { UserService } from '../../src/user/user.service';
import { CreateUserDto } from '../../src/user/dto/create-user.dto';
import { describe, expect, it } from 'vitest';
import { UpdateUserDto } from '../../src/user/dto/update-user.dto';

describe('UserController', async () => {
  const userController = new UserController(
    new UserService(new PrismaService()),
  );
  const data: CreateUserDto = {
    name: 'Pedro Paulo',
    email: 'pedro@paulo.com.br',
    password: 'bg1293fd0122',
    phone: '62999874478',
  };
  const createdUser = await userController.create(data);

  it('shold create user', async () => {
    expect(createdUser.email).toBe(data.email);
  });
  it('shold find user', async () => {
    const user = await userController.findOne(createdUser.id);
    expect(user.email).toBe(data.email);
  });
  it('shold find user', async () => {
    const users = await userController.findAll();
    expect(users[0].email).toBe(data.email);
  });
  it('shold update user', async () => {
    const toUpdate: UpdateUserDto = {
      name: 'João José',
    };
    const updated = await userController.update(createdUser.id, toUpdate);
    expect(updated.name).toBe(toUpdate.name);
  });
  it('shold delete the user', async () => {
    const deleted = await userController.remove(createdUser.id);
    expect(deleted.email).toBe(createdUser.email);
  });
});
