import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../products/product.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  street!: string;

  @Column()
  city!: string;

  @Column()
  country!: string;

  @Column()
  zip!: string;

  @Column()
  label!: string;

  @OneToMany(() => Product, (product) => product.address, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'productId' })
  products!: Product[];

  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user!: User;
}
