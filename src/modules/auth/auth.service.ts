import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwt: JwtService,
  ) {}
  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }
  //
  // findAll() {
  //   return `This action returns all auth`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }
  //
  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
  async login(userID: string) {
    const user = await this.usersRepository.findByIdOrNotFoundFail(
      Number(userID),
    );
    if (!user) throw new UnauthorizedException();

    return this.jwt.sign({ userId: user.id, name: user.name });
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new UnauthorizedException();

    const isEqualPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isEqualPassword) throw new UnauthorizedException();

    return user.id;
  }
}
