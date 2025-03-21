import { UserService } from './user.service';
import { SearchFriendResponseDto } from 'src/dto/friend/search-friend.dto';
import { FriendDto } from 'src/dto/friend/friend.dto';
import { SendFriendRequestDto } from 'src/dto/friend/send-friend-request.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getFriends(req: Request | any): Promise<FriendDto[]>;
    searchFriends(searchTerm: string, req: Request | any): Promise<SearchFriendResponseDto>;
    sendFriendRequest(sendFriendRequestDto: SendFriendRequestDto, req: Request | any): Promise<{
        message: string;
    }>;
    getPendingFriend(req: Request | any): Promise<import("../../entities/user.entity").User[]>;
    acceptFriendRequest(requestId: number, req: Request | any): Promise<{
        id: number;
        fullname: string;
    }>;
    rejectFriendRequest(requestId: number, req: Request | any): Promise<{
        message: string;
        data: import("../../entities/friend-request.entity").FriendRequest;
    }>;
    unfriend(targetUserId: number, req: Request | any): Promise<{
        message: string;
    }>;
}
