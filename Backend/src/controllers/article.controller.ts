import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Order } from 'src/entities/order.entity';
import { ArticleService } from 'src/services/article.service';
import { OrderService } from 'src/services/order.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly entityService: ArticleService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() image: Express.Multer.File, @Body() order: Order) {
    const buffer = image.buffer;
    const base64Image = new Buffer(buffer).toString('base64');
    order.image = base64Image;
    return this.entityService.create(order);
  }

  @Get()
  findAll() {
    return this.entityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.entityService.findOne(+id);
  }

  @Put()
  @UseInterceptors(FileInterceptor('image'))
  update(@UploadedFile() image: Express.Multer.File, @Body() order: Order) {
    if (image) {
      const base64Image = image.buffer.toString('base64');
      order.image = base64Image;
    }

    return this.entityService.update(order);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entityService.remove(+id);
  }
}
