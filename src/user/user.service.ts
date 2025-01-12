import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserDto): Promise<User> {
    if (await this.exists({ email: data.email, phone: data.phone })) {
      throw new BadRequestException('User Already Exists');
    }
    return this.prisma.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findFirst({ where });
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: UpdateUserDto,
  ): Promise<User> {
    if (await this.exists(where)) {
      throw new BadRequestException('User Already Exists');
    }
    return this.prisma.user.update({ where, data });
  }

  remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
  async exists(where: Prisma.UserWhereUniqueInput): Promise<boolean> {
    const count = await this.prisma.user.count({ where });
    if (count > 0) return true;
    else return false;
  }
}
