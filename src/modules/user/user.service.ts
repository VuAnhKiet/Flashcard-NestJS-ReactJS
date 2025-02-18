import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository:User){}
    getUser():string{
        return 'Get success';
    }
}
