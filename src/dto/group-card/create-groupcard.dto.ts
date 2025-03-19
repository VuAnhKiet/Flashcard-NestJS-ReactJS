import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupCardDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
