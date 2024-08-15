import { Injectable } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { CommonService } from './common.service';
import { ApiResponse } from 'src/common/classes/api-response';

@Injectable()
export class UserService extends CommonService {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async create(user: User) {
    const apiResponse = new ApiResponse();
    try {
      const oldEntity = await this.entityManager.findOne(User, {
        where: {
          email: user.email,
        },
      });

      if (oldEntity) {
        apiResponse.error = true;
        apiResponse.message = 'User E-mail Already exist';
        return apiResponse;
      }

      const salt = 10;
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;
      const entity = await this.entityManager.save(User, user);
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }

    return apiResponse;
  }

  async findAll() {
    return await this.entityManager.find(User);
  }

  async findAllByRole(role: number) {
    return await this.entityManager.find(User, {where: {role: role}});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(user: User) {
    const apiResponse = new ApiResponse();
    try {
      const oldEntity = await this.entityManager.findOne(User, {
        where: {
          id: Not(user.id),
          email: user.email,
        },
      });

      if (oldEntity) {
        apiResponse.error = true;
        apiResponse.message = 'User E-mail Already exist';
        return apiResponse;
      }

      const dbUser = await this.entityManager.findOne(User, {
        where: {
          id: user.id,
        },
      });

      dbUser.role = user.role;
      dbUser.email = user.email;
      dbUser.firstName = user.firstName;
      dbUser.lastName = user.lastName;

      const entity = await this.entityManager.save(User, dbUser);
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }

    return apiResponse;
  }

  remove(id: number) {
    return this.entityManager.delete(User, id);
  }
}
