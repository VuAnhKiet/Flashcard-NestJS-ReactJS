import { User } from "./user.entity";
export declare class FriendRequest {
    id: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    sender: User;
    receiver: User;
}
