import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/auth/login.dto';
import { RegisterDto } from 'src/dto/auth/register.dto';
import { UserEmailDto } from 'src/dto/user/user-email.dto';
import { Response, Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getUser(req: Request | any): Promise<void>;
    login(loginDto: LoginDto, res: Response): Promise<any>;
    register(registerDto: RegisterDto): Promise<any>;
    sendMail(userEmail: UserEmailDto): Promise<string>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    refreshToken(req: Request | any, res: Response): Promise<any>;
    logout(req: Request | any): Promise<{}>;
}
