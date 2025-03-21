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
exports.CardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const card_entity_1 = require("../../entities/card.entity");
const group_card_entity_1 = require("../../entities/group-card.entity");
const typeorm_2 = require("typeorm");
let CardService = class CardService {
    constructor(cardRepository, groupCardRepository) {
        this.cardRepository = cardRepository;
        this.groupCardRepository = groupCardRepository;
    }
    async createCard(createCardDto) {
        try {
            const groupCard = await this.groupCardRepository.findOne({
                where: { id: createCardDto.groupCardId }
            });
            if (!groupCard) {
                throw new common_1.NotFoundException('Group card not found');
            }
            const newCard = this.cardRepository.create({
                ...createCardDto,
                groupCard,
            });
            return await this.cardRepository.save(newCard);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error creating card: ' + error.message);
        }
    }
    async deleteCard(cardId) {
        try {
            const result = await this.cardRepository.delete(cardId);
            if (result.affected === 0) {
                throw new common_1.NotFoundException('Card not found');
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error deleting card: ' + error.message);
        }
    }
    async updateCard(id, updateCardDto) {
        try {
            const card = await this.cardRepository.findOne({
                where: { id }
            });
            if (!card) {
                throw new common_1.NotFoundException('Card not found');
            }
            Object.assign(card, updateCardDto);
            return await this.cardRepository.save(card);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error updating card: ' + error.message);
        }
    }
    async searchCard(searchQuery, groupCardId) {
        try {
            return await this.cardRepository.find({
                where: {
                    word: (0, typeorm_2.Like)(`%${searchQuery}%`),
                    groupCard: { id: groupCardId },
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error searching for card: ' + error.message);
        }
    }
};
exports.CardService = CardService;
exports.CardService = CardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(card_entity_1.Card)),
    __param(1, (0, typeorm_1.InjectRepository)(group_card_entity_1.GroupCard)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CardService);
//# sourceMappingURL=card.service.js.map