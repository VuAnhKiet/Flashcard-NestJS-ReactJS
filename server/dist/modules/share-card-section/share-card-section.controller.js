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
exports.ShareCardSectionController = void 0;
const common_1 = require("@nestjs/common");
const share_card_section_service_1 = require("./share-card-section.service");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const addToShareSection_dto_1 = require("../../dto/share-section/addToShareSection.dto");
let ShareCardSectionController = class ShareCardSectionController {
    constructor(shareSectionService) {
        this.shareSectionService = shareSectionService;
    }
    async getShareCard(req) {
        return this.shareSectionService.getSharedCards(req.tokenPayload.id);
    }
    async getFriendSetCard(id) {
        return this.shareSectionService.getFriendsSetCard(id);
    }
    async getFriendsCard(id) {
        return this.shareSectionService.getFriendsCard(id);
    }
    async addToShareSection(req, dto) {
        const userId = req.tokenPayload.id;
        return this.shareSectionService.addToShareSection(dto.id, dto.name, userId);
    }
    async removeFromShareSection(cardId) {
        return this.shareSectionService.removeFromShareSection(cardId);
    }
};
exports.ShareCardSectionController = ShareCardSectionController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShareCardSectionController.prototype, "getShareCard", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Get)('friend-set-card/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShareCardSectionController.prototype, "getFriendSetCard", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Get)('friend-card/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShareCardSectionController.prototype, "getFriendsCard", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, addToShareSection_dto_1.AddToShareSectionDto]),
    __metadata("design:returntype", Promise)
], ShareCardSectionController.prototype, "addToShareSection", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Delete)('remove-from-section/:cardId'),
    __param(0, (0, common_1.Param)('cardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShareCardSectionController.prototype, "removeFromShareSection", null);
exports.ShareCardSectionController = ShareCardSectionController = __decorate([
    (0, common_1.Controller)('share-card-section'),
    __metadata("design:paramtypes", [share_card_section_service_1.ShareCardSectionService])
], ShareCardSectionController);
//# sourceMappingURL=share-card-section.controller.js.map