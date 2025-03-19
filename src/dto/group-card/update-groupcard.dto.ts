import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateGroupCardDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
