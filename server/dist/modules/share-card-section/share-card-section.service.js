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
exports.ShareCardSectionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const card_entity_1 = require("../../entities/card.entity");
const share_section_entity_1 = require("../../entities/share-section.entity");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
let ShareCardSectionService = class ShareCardSectionService {
    constructor(shareSectionRepository, userRepository, cardRepository) {
        this.shareSectionRepository = shareSectionRepository;
        this.userRepository = userRepository;
        this.cardRepository = cardRepository;
    }
    async getSharedCards(userId) {
        try {
            const shareCards = await this.shareSectionRepository.find({
                where: { user: { id: userId } },
                select: ['id', 'set_cards_name'],
            });
            if (!shareCards.length) {
                return [];
            }
            return shareCards;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async getFriendsSetCard(friendId) {
        try {
            const shareCards = await this.shareSectionRepository.find({
                where: { user: { id: friendId } },
                relations: ['groupCard'],
                select: ['id', 'set_cards_name'],
            });
            if (!shareCards.length) {
                return { message: 'No shared cards found for this user' };
            }
            console.log(shareCards);
            const user = await this.userRepository.findOne({
                where: { id: friendId },
                select: ['fullname'],
            });
            if (!user) {
                throw new common_1.NotFoundException('Friend not found');
            }
            return {
                setcards: shareCards.map(setcard => ({
                    setcardId: setcard.groupCard.id,
                    set_cards_name: setcard.set_cards_name,
                })),
                friend_name: user.fullname,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async getFriendsCard(groupCardId) {
        try {
            const shareCards = await this.cardRepository.find({
                where: { groupCard: { id: groupCardId } },
                select: ['id', 'word', 'definition'],
            });
            if (!shareCards.length) {
                return [];
            }
            return shareCards;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async addToShareSection(setCardId, setName, userId) {
        try {
            const addTo = this.shareSectionRepository.create({
                set_cards_name: setName,
                user: { id: userId },
                groupCard: { id: setCardId },
            });
            return await this.shareSectionRepository.save(addTo);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error adding card to share section: ' + error.message);
        }
    }
    async removeFromShareSection(cardId) {
        try {
            const deleteResult = await this.shareSectionRepository.delete(cardId);
            if (deleteResult.affected === 0) {
                throw new common_1.NotFoundException(`No shared card found with ID ${cardId}`);
            }
            return 'Deleted!';
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error deleting shared card: ' + error.message);
        }
    }
};
exports.ShareCardSectionService = ShareCardSectionService;
exports.ShareCardSectionService = ShareCardSectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(share_section_entity_1.ShareSection)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(card_entity_1.Card)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ShareCardSectionService);
//# sourceMappingURL=share-card-section.service.js.map