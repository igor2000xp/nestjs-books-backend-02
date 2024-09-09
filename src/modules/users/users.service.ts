import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async registerUser(dto: RegisterUserDto): Promise<number> {
    console.log('user.service = ', dto);
    let user = await this.usersRepository.findByEmail(dto.email);
    if (user) throw new BadRequestException('This email is registered already');
    user = await User.createUser(dto);

    return user.id;
  }

  async getAllUsers() {
    return await this.usersRepository.findAll();
  }
}
