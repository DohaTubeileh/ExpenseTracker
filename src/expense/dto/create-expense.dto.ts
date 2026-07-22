import { IsString, IsPositive, IsEnum } from 'class-validator';
import { Categories } from '@prisma/client';
export class CreateExpenseDto {
  @IsString()
  readonly title!: string;

  @IsPositive()
  readonly amount!: string;

  @IsEnum(Categories)
  readonly categories!: Categories;
}
