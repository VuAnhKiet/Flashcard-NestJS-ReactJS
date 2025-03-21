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
exports.GroupCardController = void 0;
const common_1 = require("@nestjs/common");
const group_card_service_1 = require("./group-card.service");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const create_groupcard_dto_1 = require("../../dto/group-card/create-groupcard.dto");
const update_groupcard_dto_1 = require("../../dto/group-card/update-groupcard.dto");
let GroupCardController = class GroupCardController {
    constructor(groupCardService) {
        this.groupCardService = groupCardService;
    }
    async getGroupCard(req) {
        const userId = req.tokenPayload.id;
        return this.groupCardService.getGroupCards(userId);
    }
    async getCardsByGroupId(id) {
        return this.groupCardService.getCardsByGroupId(id);
    }
    async createGroupCard(createGroupCardDto, req) {
        const userId = req.tokenPayload.id;
        return this.groupCardService.createGroupCard(createGroupCardDto, userId);
    }
    async deleteGroupCard(id, req) {
        const userId = req.tokenPayload.id;
        return this.groupCardService.deleteGroupCard(id, userId);
    }
    async updateGroupCard(id, updateGroupCardDto, req) {
        const userId = req.tokenPayload.id;
        return this.groupCardService.updateGroupCard(id, updateGroupCardDto, userId);
    }
    async searchGroupCard(searchTerm, req) {
        const userId = req.tokenPayload.id;
        return this.groupCardService.searchGroupCard(searchTerm, userId);
    }
};
exports.GroupCardController = GroupCardController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupCardController.prototype, "getGroupCard", null);
__decorate([
    (0, common_1.Get)('byId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GroupCardController.prototype, "getCardsByGroupId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_groupcard_dto_1.CreateGroupCardDto, Object]),
    __metadata("design:returntype", Promise)
], GroupCardController.prototype, "createGroupCard", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GroupCardController.prototype, "deleteGroupCard", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_groupcard_dto_1.UpdateGroupCardDto, Object]),
    __metadata("design:returntype", Promise)
], GroupCardController.prototype, "updateGroupCard", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('s')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GroupCardController.prototype, "searchGroupCard", null);
exports.GroupCardController = GroupCardController = __decorate([
    (0, common_1.Controller)('group-card'),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    __metadata("design:paramtypes", [group_card_service_1.GroupCardService])
], GroupCardController);
//# sourceMappingURL=group-card.controller.js.map