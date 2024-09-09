import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    example: 'Igor',
    description: 'User Name as a string',
  })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    example: 'igor@gmail.com',
    description: 'User email address',
  })
  @IsEmail({}, { message: 'The email must be a valid email address' })
  email: string;

  @ApiProperty({
    example: '18',
    description: 'User name',
  })
  @IsString()
  age: string;

  @ApiProperty({
    example: 'Password_123',
    description: 'User password',
    minLength: 8,
    maxLength: 20,
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password must not be longer than 20 characters' })
  password: string;
}
