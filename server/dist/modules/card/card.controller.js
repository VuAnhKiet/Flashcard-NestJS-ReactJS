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
exports.CardController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const card_service_1 = require("./card.service");
const create_card_dto_1 = require("../../dto/card/create-card.dto");
let CardController = class CardController {
    constructor(cardService) {
        this.cardService = cardService;
    }
    async createCard(createCardDto) {
        return this.cardService.createCard(createCardDto);
    }
    async deleteCard(cardId) {
        await this.cardService.deleteCard(cardId);
        return { message: 'Card deleted successfully!' };
    }
    async updateCard(id, updateCardDto) {
        return this.cardService.updateCard(id, updateCardDto);
    }
    async searchCard(searchQuery, groupCardId) {
        return this.cardService.searchCard(searchQuery, groupCardId);
    }
};
exports.CardController = CardController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_card_dto_1.CreateCardDto]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "createCard", null);
__decorate([
    (0, common_1.Delete)(':cardId'),
    __param(0, (0, common_1.Param)('cardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "deleteCard", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_card_dto_1.CreateCardDto]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "updateCard", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('s')),
    __param(1, (0, common_1.Query)('groupCardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "searchCard", null);
exports.CardController = CardController = __decorate([
    (0, common_1.Controller)('cards'),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    __metadata("design:paramtypes", [card_service_1.CardService])
], CardController);
//# sourceMappingURL=card.controller.js.map