import { IsNumber, IsString } from 'class-validator';

export class FriendDto {
    @IsNumber()
    id: number;

    @IsString()
    fullname: string;
}