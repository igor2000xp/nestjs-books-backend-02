import { Injectable, UnauthorizedException } from '@nestjs/common';
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
  // async login(userID: string) {
  //   const user = await this.usersRepository.findByIdOrNotFoundFail(
  //     Number(userID),
  //   );
  //   if (!user) throw new UnauthorizedException();
  //
  //   return { accessToken: this.jwt.sign({ userId: user.id }) };
  // }

  async validateUser(name: string, password: string) {
    const user = await this.usersRepository.findByEmail(name);
    if (!user) throw new UnauthorizedException();
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) return null;

    return user.id;
  }

  async login(name: string, password: string) {
    // const user = await this.usersRepository.findByIdOrNotFoundFail(
    //   Number(userID),
    // );

    const user = await this.usersRepository.findByEmail(name);
    if (!user) throw new UnauthorizedException();
    const isValid = await this.validateUser(name, password);
    if (!isValid) return null;

    return { accessToken: this.jwt.sign({ userId: user.id }) };
  }
}
