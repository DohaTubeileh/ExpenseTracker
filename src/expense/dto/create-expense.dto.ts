import { IsString, IsPositive, IsEnum } from 'class-validator';
import { Categories } from '@prisma/client';
import { Type } from 'class-transformer';
export class CreateExpenseDto {
  @IsString()
  readonly title!: string;

  @IsPositive()
  @Type(() => Number)
  readonly amount!: number;

  @IsEnum(Categories)
  readonly categories!: Categories;
}
