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
exports.GroupCardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const card_entity_1 = require("../../entities/card.entity");
const group_card_entity_1 = require("../../entities/group-card.entity");
const typeorm_2 = require("typeorm");
let GroupCardService = class GroupCardService {
    constructor(groupCardRepository, cardRepository) {
        this.groupCardRepository = groupCardRepository;
        this.cardRepository = cardRepository;
    }
    async getGroupCards(userId) {
        try {
            const listOfSetCards = await this.groupCardRepository.find({
                where: { user: { id: userId } },
            });
            return listOfSetCards;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching group cards: ' + error.message);
        }
    }
    async getCardsByGroupId(groupCardId) {
        try {
            const setcards = await this.cardRepository.find({
                where: { groupCard: { id: groupCardId } },
            });
            if (!setcards.length) {
                return [];
            }
            return setcards;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching cards: ' + error.message);
        }
    }
    async createGroupCard(createGroupCardDto, userId) {
        try {
            const newGroupCard = this.groupCardRepository.create({
                name: createGroupCardDto.name,
                user: { id: userId },
            });
            return await this.groupCardRepository.save(newGroupCard);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error creating group card: ' + error.message);
        }
    }
    async deleteGroupCard(id, userId) {
        try {
            const groupCard = await this.groupCardRepository.findOne({ where: { id, user: { id: userId } } });
            if (!groupCard) {
                throw new common_1.NotFoundException('Group card not found or you are not authorized to delete it');
            }
            await this.groupCardRepository.remove(groupCard);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error deleting group card: ' + error.message);
        }
    }
    async updateGroupCard(id, updateGroupCardDto, userId) {
        try {
            const groupCard = await this.groupCardRepository.findOne({ where: { id, user: { id: userId } } });
            if (!groupCard) {
                throw new common_1.NotFoundException('Group card not found or you are not authorized to update it');
            }
            groupCard.name = updateGroupCardDto.name;
            return await this.groupCardRepository.save(groupCard);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error updating group card: ' + error.message);
        }
    }
    async searchGroupCard(searchTerm, userId) {
        try {
            if (!searchTerm) {
                throw new common_1.BadRequestException('Please fill in before searching');
            }
            const result = await this.groupCardRepository.find({
                where: {
                    name: (0, typeorm_2.Like)(`%${searchTerm}%`),
                    user: { id: userId },
                },
            });
            if (result.length === 0) {
                throw new common_1.NotFoundException('No items found matching your search criteria.');
            }
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error searching group cards: ' + error.message);
        }
    }
};
exports.GroupCardService = GroupCardService;
exports.GroupCardService = GroupCardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(group_card_entity_1.GroupCard)),
    __param(1, (0, typeorm_1.InjectRepository)(card_entity_1.Card)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GroupCardService);
//# sourceMappingURL=group-card.service.js.map