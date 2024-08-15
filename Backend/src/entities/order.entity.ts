import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order extends BaseEntity {
  @ApiProperty()
  @Column()
  dueDate: Date;

  @ApiProperty()
  @Column()
  notes: string;

  @ApiProperty()
  @Column('longtext')
  image: string;

  @ApiProperty()
  @Column()
  district: number;

  @Column()
  status: number;

  @Column('longtext')
  lat: string;

  @Column('longtext')
  lng: string;

  @ApiProperty()
  @Column('longtext')
  address: string;

  @Column({ nullable: true })
  selectedBillId: number;

  @ApiProperty()
  @Column({default: false})
  urgent: boolean;
}
