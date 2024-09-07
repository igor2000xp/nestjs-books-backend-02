import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import type { ApiPropertyOptions } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export function ApiEmail(apiPropertyOptions: ApiPropertyOptions) {
  const { required = true } = apiPropertyOptions;

  const decorators = [
    // ApiProperty({
    //   ...apiPropertyOptions,
    //   type: 'string',
    //   format: 'email',
    //   nullable: !required,
    // }),
    IsString(),
    // IsEmail(),
  ];

  if (!required) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}
