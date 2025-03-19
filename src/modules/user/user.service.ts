import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendDto } from 'src/dto/friend/friend.dto';
import { SearchFriendResponseDto } from 'src/dto/friend/search-friend.dto';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { User } from 'src/entities/user.entity';
import { In, Like, Not, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(FriendRequest) private friendRequestRepository: Repository<FriendRequest>
  ) { }

  async getFriend(userId: number): Promise<FriendDto[]> {
    try {
      const friendsList = await this.friendRequestRepository
        .createQueryBuilder('friendRequest')
        .leftJoinAndSelect('friendRequest.sender', 'sender')
        .leftJoinAndSelect('friendRequest.receiver', 'receiver')
        .where(
          '(friendRequest.senderId = :userId AND friendRequest.status = :status) OR (friendRequest.receiverId = :userId AND friendRequest.status = :status)',
          { userId, status: 'accepted' },
        )
        .getMany();

      if (!friendsList || friendsList.length === 0) {
        return [];
      }

      const friendListDtos: FriendDto[] = friendsList.map((request) => {
        const friend = request.sender.id === userId ? request.receiver : request.sender;
        return { id: friend.id, fullname: friend.fullname };
      });

      return friendListDtos;
    } catch (error) {
      throw new Error('Failed to fetch friends list: ' + error.message);
    }
  }


  async searchFriends(userId: number, searchTerm: string) {
    if (!searchTerm) {
      throw new BadRequestException('Please fill in before searching');
    }

    try {
      const existingFriends = await this.friendRequestRepository.find({
        where: [
          { sender: { id: userId }, status: 'accepted' },
          { receiver: { id: userId }, status: 'accepted' },
        ],
        relations: ['sender', 'receiver'],
      });

      const existingRequests = await this.friendRequestRepository.find({
        where: [
          { sender: { id: userId }, status: 'pending' },
          { receiver: { id: userId }, status: 'pending' },
        ],
        relations: ['sender', 'receiver'],
      });

      const friendIds = existingFriends.map(friend =>
        friend.sender.id === userId ? friend.receiver.id : friend.sender.id
      );

      const pendingRequestIds = existingRequests.map(request =>
        request.sender.id === userId ? request.receiver.id : request.sender.id
      );

      console.log(existingRequests);
      console.log(pendingRequestIds);

      const users = await this.userRepository.find({
        where: {
          fullname: Like(`%${searchTerm}%`),
          id: Not(In([userId, ...friendIds])), // Exclude current user and friends
        },
      });

      const friends = users.map(user => ({
        id: user.id,
        fullname: user.fullname,
      }));

      return {
        friends,
        pendingFriends: pendingRequestIds,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error searching for friends');
    }
  }

  async sendRequest(senderId: number, receiverId: number): Promise<void> {
    try {
      const friendRequest = this.friendRequestRepository.create({
        sender: { id: senderId },
        receiver: { id: receiverId },
        status: 'pending',
      });

      await this.friendRequestRepository.save(friendRequest);
    } catch (error) {
      throw new InternalServerErrorException('Error sending friend request');
    }
  }

  async getPendingFriends(userId: number) {
    try {
      const pendingRequests = await this.friendRequestRepository.find({
        where: {
          receiver: { id: userId },
          status: 'pending',
        },
        relations: ['sender', 'receiver'],
      });

      const pendingList = pendingRequests.map(request => {
        return request.receiver.id === userId ? request.sender : request.receiver;
      });

      return pendingList;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async acceptFriendRequest(userId: number, requestId: number): Promise<{ id: number; fullname: string }> {
    try {
      const request = await this.friendRequestRepository.findOne({
        where: {
          sender: { id: requestId },
          receiver: { id: userId },
        },
        relations: ['sender', 'receiver'],
      });

      if (!request) {
        throw new NotFoundException('Friend request not found');
      }

      request.status = 'accepted';
      await this.friendRequestRepository.save(request);

      const newFriend = request.sender;

      return { id: newFriend.id, fullname: newFriend.fullname };
    } catch (error) {
      throw new InternalServerErrorException('Error accepting friend request');
    }
  }

  async rejectFriendRequest(userId: number, requestId: number): Promise<FriendRequest> {
    try {
      const request = await this.friendRequestRepository.findOne({
        where: {
          sender: { id: requestId },
          receiver: { id: userId },
        },
        relations: ['sender', 'receiver'],
      });

      if (!request) {
        throw new NotFoundException('Request not found');
      }

      request.status = 'declined';
      await this.friendRequestRepository.save(request);

      return request;
    } catch (error) {
      throw new InternalServerErrorException('Error rejecting friend request');
    }
  }

  async unfriend(userId: number, targetUserId: number): Promise<string> {
    try {
      const friendship = await this.friendRequestRepository.findOne({
        where: [
          { sender: { id: userId }, receiver: { id: targetUserId } },
          { sender: { id: targetUserId }, receiver: { id: userId } },
        ],
      });

      if (!friendship) {
        throw new NotFoundException('Friendship not found');
      }

      await this.friendRequestRepository.remove(friendship);

      return 'Unfriend successful';
    } catch (error) {
      throw new InternalServerErrorException('Error removing friendship');
    }
  }

}


