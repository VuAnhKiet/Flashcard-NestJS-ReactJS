import { FriendDto } from './friend.dto';

export class SearchFriendResponseDto {
    friends: FriendDto[];
    pendingFriends: number[];
}