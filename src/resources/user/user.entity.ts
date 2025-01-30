import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../products/product.entity';
import { Address } from '../address/address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  name!: string;

  @OneToMany(() => Product, (product) => product.user, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  products!: Product[];

  @OneToMany(() => Address, (address) => address.user, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  addresses!: Address[];

  // Define custom serialization behavior
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
