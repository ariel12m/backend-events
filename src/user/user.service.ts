  import { Injectable } from '@nestjs/common';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { UpdateProfileDto } from './dto/update-profile.dto';
  import { PrismaService } from 'src/prisma/prisma.service';
  import * as bcrypt from 'bcrypt';

  @Injectable()
  export class UserService {
    constructor(private prisma: PrismaService) {}

    findByEmail(email: string) {
      return this.prisma.user.findUnique({
        where: { email },
      });
    }
    async create(createUserDto: CreateUserDto) {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const { events, ...userDataWithoutEvents } = createUserDto;
      return this.prisma.user.create({
        data: {
          ...userDataWithoutEvents,
          password: hashedPassword, 
          events: events ? { connect: events.map(id => ({ id })) } : undefined,
        },
        include: { events: true },
      });
    }

    findAll() {
      return this.prisma.user.findMany(
        { include: { events: true } }
      );
    }

    findOne(id: number) {
      return this.prisma.user.findUnique({
        where: {id},
        //include: { events: true }
      });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
      const { events, ...userDataWithoutEvents } = updateUserDto;
      return this.prisma.user.update({
        where: {id},
        data: {
          ...userDataWithoutEvents,
          events: events ? { connect: events.map(eventId => ({ id: eventId })) } : undefined,
        },
      });
    }

    updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
      return this.prisma.user.update({
        where: { id },
        data: updateProfileDto,
      });
    }

    remove(id: number) {
      return this.prisma.user.delete(
        {
          where: {id},
        }
      );
    }
  }