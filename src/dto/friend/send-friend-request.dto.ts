import { IsNumber } from 'class-validator';

export class SendFriendRequestDto {
  @IsNumber()
  receiverId: number;
}
