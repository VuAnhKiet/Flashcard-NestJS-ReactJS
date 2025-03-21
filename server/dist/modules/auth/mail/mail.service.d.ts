import { User } from 'src/entities/user.entity';
import { Token } from 'src/entities/token.entity';
import { Repository } from 'typeorm';
export declare class MailService {
    private userRepository;
    private tokenRepository;
    private transporter;
    constructor(userRepository: Repository<User>, tokenRepository: Repository<Token>);
    sendMail(email: string): Promise<string>;
}
