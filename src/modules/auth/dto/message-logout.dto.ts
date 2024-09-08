import { ApiProperty } from '@nestjs/swagger';

export class LogoutMessage {
  @ApiProperty({
    example: 'The refresh token was removed successfully',
    description: 'Message about successful or Error message',
  })
  readonly value: string;
}
