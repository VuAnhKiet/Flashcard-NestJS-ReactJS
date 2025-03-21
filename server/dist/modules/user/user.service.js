"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const friend_request_entity_1 = require("../../entities/friend-request.entity");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userRepository, friendRequestRepository) {
        this.userRepository = userRepository;
        this.friendRequestRepository = friendRequestRepository;
    }
    async getFriend(userId) {
        try {
            const friendsList = await this.friendRequestRepository
                .createQueryBuilder('friendRequest')
                .leftJoinAndSelect('friendRequest.sender', 'sender')
                .leftJoinAndSelect('friendRequest.receiver', 'receiver')
                .where('(friendRequest.senderId = :userId AND friendRequest.status = :status) OR (friendRequest.receiverId = :userId AND friendRequest.status = :status)', { userId, status: 'accepted' })
                .getMany();
            if (!friendsList || friendsList.length === 0) {
                return [];
            }
            const friendListDtos = friendsList.map((request) => {
                const friend = request.sender.id === userId ? request.receiver : request.sender;
                return { id: friend.id, fullname: friend.fullname };
            });
            return friendListDtos;
        }
        catch (error) {
            throw new Error('Failed to fetch friends list: ' + error.message);
        }
    }
    async searchFriends(userId, searchTerm) {
        if (!searchTerm) {
            throw new common_1.BadRequestException('Please fill in before searching');
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
            const friendIds = existingFriends.map(friend => friend.sender.id === userId ? friend.receiver.id : friend.sender.id);
            const pendingRequestIds = existingRequests.map(request => request.sender.id === userId ? request.receiver.id : request.sender.id);
            console.log(existingRequests);
            console.log(pendingRequestIds);
            const users = await this.userRepository.find({
                where: {
                    fullname: (0, typeorm_2.Like)(`%${searchTerm}%`),
                    id: (0, typeorm_2.Not)((0, typeorm_2.In)([userId, ...friendIds])),
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error searching for friends');
        }
    }
    async sendRequest(senderId, receiverId) {
        try {
            const friendRequest = this.friendRequestRepository.create({
                sender: { id: senderId },
                receiver: { id: receiverId },
                status: 'pending',
            });
            await this.friendRequestRepository.save(friendRequest);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error sending friend request');
        }
    }
    async getPendingFriends(userId) {
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
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async acceptFriendRequest(userId, requestId) {
        try {
            const request = await this.friendRequestRepository.findOne({
                where: {
                    sender: { id: requestId },
                    receiver: { id: userId },
                },
                relations: ['sender', 'receiver'],
            });
            if (!request) {
                throw new common_1.NotFoundException('Friend request not found');
            }
            request.status = 'accepted';
            await this.friendRequestRepository.save(request);
            const newFriend = request.sender;
            return { id: newFriend.id, fullname: newFriend.fullname };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error accepting friend request');
        }
    }
    async rejectFriendRequest(userId, requestId) {
        try {
            const request = await this.friendRequestRepository.findOne({
                where: {
                    sender: { id: requestId },
                    receiver: { id: userId },
                },
                relations: ['sender', 'receiver'],
            });
            if (!request) {
                throw new common_1.NotFoundException('Request not found');
            }
            request.status = 'declined';
            await this.friendRequestRepository.save(request);
            return request;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error rejecting friend request');
        }
    }
    async unfriend(userId, targetUserId) {
        try {
            const friendship = await this.friendRequestRepository.findOne({
                where: [
                    { sender: { id: userId }, receiver: { id: targetUserId } },
                    { sender: { id: targetUserId }, receiver: { id: userId } },
                ],
            });
            if (!friendship) {
                throw new common_1.NotFoundException('Friendship not found');
            }
            await this.friendRequestRepository.remove(friendship);
            return 'Unfriend successful';
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error removing friendship');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(friend_request_entity_1.FriendRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map