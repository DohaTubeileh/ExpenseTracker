import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterExpenseDto {
  @IsOptional()
  @Type(() => Date) //Transform: Converts string "2026-07-22" into a Date object
  @IsDate({
    //Validation: Confirms it is a valid calendar date
    message: 'The date query must be a valid ISO 8601 date string (YYYY-MM-DD)',
  })
  readonly from?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate({
    message: 'The date query must be a valid ISO 8601 date string (YYYY-MM-DD)',
  })
  readonly to?: number;
}
