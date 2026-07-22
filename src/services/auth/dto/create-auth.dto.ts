import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*[^a-zA-Z0-9])/, {
    message: 'Password must contain at least one special/unique character',
  })
  readonly password!: string;
}
