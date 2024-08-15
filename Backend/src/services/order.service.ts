import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { CommonService } from './common.service';
import { ApiResponse } from 'src/common/classes/api-response';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { Article } from 'src/entities/article.entity';



@Injectable()
export class OrderService extends CommonService {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async create(order: Order) {
    const apiResponse = new ApiResponse();
    try {
      order.status = 1;
      const entity = await this.entityManager.save(Order, order);
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }

    return apiResponse;
  }

  async findAll() {
    const apiResponse = new ApiResponse();
    try {
      const entity = await this.entityManager.find(Order);
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }

  async myOrders(id: number) {
    const apiResponse = new ApiResponse();
    try {
      const entity = await this.entityManager.find(Order, {
        where: { createdUserId: id },
      });
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }

async districtOrders(userId: number) {
    const apiResponse = new ApiResponse();
    try {
      const user = await this.entityManager.findOne(User, {
        where: { id: userId },
      });

      const orders = await this.entityManager.find(Order,{
        where:{
          status:In([1,2])

        }
      });
      apiResponse.data = orders;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }

 async findOne(id: number) {
    const apiResponse = new ApiResponse();
    try {
      console.log(id);
      const entity = await this.entityManager.findOne(Order, {
        where: { id: id },
      });
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }

  async update(order: Order) {
    const apiResponse = new ApiResponse();
    try {
      const entity = await this.entityManager.update(
        Order,
        { id: order.id },
        order,
      );
      apiResponse.data = entity;
    } catch (error) {
      console.log(error);
      apiResponse.error = true;
      apiResponse.message = error.message;
    }

    return apiResponse;
  }

  async remove(id: number) {
    const apiResponse = new ApiResponse();
    try {
      const entity = await this.entityManager.delete(Order, id);
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }
}
