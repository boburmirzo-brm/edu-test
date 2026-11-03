import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Bobur' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ example: 25 })
  @Column({ type: 'int' })
  age: number;
}
