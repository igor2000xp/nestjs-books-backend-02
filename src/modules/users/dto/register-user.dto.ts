import { ApiEmail } from '../../../core/decorators/api-email.decorator';

export class RegisterUserDto {
  @ApiEmail({
    description: 'uniq users email',
  })
  name: string;
  email: string;
  age: number;
  password: string;
}
