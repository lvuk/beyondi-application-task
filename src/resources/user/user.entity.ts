import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // Define custom serialization behavior
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
