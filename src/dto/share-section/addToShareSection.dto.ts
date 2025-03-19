import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddToShareSectionDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
