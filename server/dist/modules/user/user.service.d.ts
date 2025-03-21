import { FriendDto } from 'src/dto/friend/friend.dto';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    private friendRequestRepository;
    constructor(userRepository: Repository<User>, friendRequestRepository: Repository<FriendRequest>);
    getFriend(userId: number): Promise<FriendDto[]>;
    searchFriends(userId: number, searchTerm: string): Promise<{
        friends: {
            id: number;
            fullname: string;
        }[];
        pendingFriends: number[];
    }>;
    sendRequest(senderId: number, receiverId: number): Promise<void>;
    getPendingFriends(userId: number): Promise<User[]>;
    acceptFriendRequest(userId: number, requestId: number): Promise<{
        id: number;
        fullname: string;
    }>;
    rejectFriendRequest(userId: number, requestId: number): Promise<FriendRequest>;
    unfriend(userId: number, targetUserId: number): Promise<string>;
}
