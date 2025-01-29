import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  image!: string;

  @Column()
  location!: string;

  @ManyToOne(() => User, (user) => user.products)
  user!: User;
}
