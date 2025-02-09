import { IsEmail, IsString, Length } from 'class-validator';

export class UserDto {
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @IsString()
  @Length(6, 32, { message: 'Пароль должен быть от 6 до 32 символов' })
  password: string;

  @IsString()
  @Length(2, 50, { message: 'Имя должно быть от 2 до 50 символов' })
  displayName: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @IsString()
  password: string;
}
