import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from '../../core/entity/basic.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  age: number;

  @Column()
  passwordHash: string;

  public static async createUser(dto: RegisterUserDto) {
    const user = new User();
    user.name = dto.name;
    user.age = parseInt(dto.age);
    user.email = dto.email;
    user.passwordHash = await bcrypt.hash(dto.password, 10);
    await user.save();
    return user;
  }
}
