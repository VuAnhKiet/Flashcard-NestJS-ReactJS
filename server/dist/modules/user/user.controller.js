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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const send_friend_request_dto_1 = require("../../dto/friend/send-friend-request.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getFriends(req) {
        const userId = req.tokenPayload.id;
        return this.userService.getFriend(userId);
    }
    async searchFriends(searchTerm, req) {
        const userId = req.tokenPayload.id;
        return this.userService.searchFriends(userId, searchTerm);
    }
    async sendFriendRequest(sendFriendRequestDto, req) {
        const userId = req.tokenPayload.id;
        const { receiverId } = sendFriendRequestDto;
        await this.userService.sendRequest(userId, receiverId);
        return { message: 'Waiting for accepting request' };
    }
    async getPendingFriend(req) {
        const userId = req.tokenPayload.id;
        const pendingFriends = await this.userService.getPendingFriends(userId);
        return pendingFriends;
    }
    async acceptFriendRequest(requestId, req) {
        const userId = req.tokenPayload.id;
        const result = await this.userService.acceptFriendRequest(userId, requestId);
        return result;
    }
    async rejectFriendRequest(requestId, req) {
        const userId = req.tokenPayload.id;
        const result = await this.userService.rejectFriendRequest(userId, requestId);
        return { message: 'Friend request rejected', data: result };
    }
    async unfriend(targetUserId, req) {
        const userId = req.tokenPayload.id;
        const result = await this.userService.unfriend(userId, targetUserId);
        return { message: result };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('get-friends'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFriends", null);
__decorate([
    (0, common_1.Get)('search-friends'),
    __param(0, (0, common_1.Query)('s')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchFriends", null);
__decorate([
    (0, common_1.Post)('send-request'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_friend_request_dto_1.SendFriendRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Get)('pending'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPendingFriend", null);
__decorate([
    (0, common_1.Put)('accept/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "acceptFriendRequest", null);
__decorate([
    (0, common_1.Put)('reject/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "rejectFriendRequest", null);
__decorate([
    (0, common_1.Delete)('unfriend/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unfriend", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map