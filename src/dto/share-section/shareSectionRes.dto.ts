import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ShareSectionResponseDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
