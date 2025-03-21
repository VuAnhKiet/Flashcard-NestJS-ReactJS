import { IsNotEmpty, IsString } from "class-validator";
export class LoginDto {
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}