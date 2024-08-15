import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Article extends BaseEntity {
  @ApiProperty()
  @Column()
  notes: string;

  @ApiProperty()
  @Column('longtext')
  image: string;
}
