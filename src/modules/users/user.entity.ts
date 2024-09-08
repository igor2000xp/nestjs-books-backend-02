import { Column, Entity } from 'typeorm';
import { BasicEntity } from '../../core/entity/basic.entity';

@Entity('users')
export class User extends BasicEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  age: number;

  @Column()
  passwordHash: string;
}
