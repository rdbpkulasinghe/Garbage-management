import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { CommonService } from './common.service';
import { ApiResponse } from 'src/common/classes/api-response';
import { Article } from 'src/entities/article.entity';

@Injectable()
export class ArticleService extends CommonService {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async create(article: Article) {
    const apiResponse = new ApiResponse();
    try {
      const entity = await this.entityManager.save(Article, article);
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
      const entity = await this.entityManager.find(Article);
      apiResponse.data = entity;
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
      const entity = await this.entityManager.findOne(Article, {
        where: { id: id },
      });
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }

  async update(article: Article) {
    const apiResponse = new ApiResponse();
    try {
      const entity = await this.entityManager.update(
        Article,
        { id: article.id },
        article,
      );
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }

    return apiResponse;
  }

  async remove(id: number) {
    const apiResponse = new ApiResponse();
    try {
      const entity = await this.entityManager.delete(Article, id);
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }
}
