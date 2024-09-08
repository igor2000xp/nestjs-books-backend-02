import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserIdDto {
  @ApiProperty({
    example: '1',
    description: 'User ID',
  })
  @IsString({ message: 'The ID must be a valid userID' })
  id: string;
}
