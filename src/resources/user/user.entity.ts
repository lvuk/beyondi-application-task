import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../products/product.entity';

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

  // Define custom serialization behavior
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
