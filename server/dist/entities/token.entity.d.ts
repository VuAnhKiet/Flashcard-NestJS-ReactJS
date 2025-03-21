import { User } from "./user.entity";
export declare class Token {
    id: number;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    user: User;
}
