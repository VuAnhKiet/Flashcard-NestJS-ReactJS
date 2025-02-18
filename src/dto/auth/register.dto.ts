import { IsNotEmpty } from "class-validator";
export class RegisterDto {
    @IsNotEmpty()
    fullname: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    email: string;
}