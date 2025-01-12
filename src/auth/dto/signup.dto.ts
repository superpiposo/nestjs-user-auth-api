import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class SignupDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({ minLength: 8 })
  redoPassword: string;
}
