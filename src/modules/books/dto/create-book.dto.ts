import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  // @Min(5)
  // @Max(120)
  ageRestriction: string;

  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  image?: string;
}
