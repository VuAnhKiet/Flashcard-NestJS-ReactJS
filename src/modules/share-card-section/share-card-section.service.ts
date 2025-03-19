import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/entities/card.entity';
import { GroupCard } from 'src/entities/group-card.entity';
import { ShareSection } from 'src/entities/share-section.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShareCardSectionService {
    constructor(
        @InjectRepository(ShareSection) private shareSectionRepository: Repository<ShareSection>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Card) private cardRepository: Repository<Card>
    ) { }

    async getSharedCards(userId: number) {
        try {
            const shareCards = await this.shareSectionRepository.find({
                where: { user: { id: userId } },
                select: ['id', 'set_cards_name'],
            });
            if (!shareCards.length) {
                return [];
            }
            return shareCards;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getFriendsSetCard(friendId: number) {
        try {
            const shareCards = await this.shareSectionRepository.find({
                where: { user: { id: friendId } },
                relations: ['groupCard'],
                select: ['id','set_cards_name'],
            });
            if (!shareCards.length) {
                return {message: 'No shared cards found for this user'};
            }

            console.log(shareCards)
            const user = await this.userRepository.findOne({
                where: { id: friendId },
                select: ['fullname'],
            });
            if (!user) {
                throw new NotFoundException('Friend not found');
            }
            return {
                setcards: shareCards.map(setcard => ({
                    setcardId: setcard.groupCard.id,
                    set_cards_name: setcard.set_cards_name,
                })),
                friend_name: user.fullname,
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getFriendsCard(groupCardId: number) {
        try {
            const shareCards = await this.cardRepository.find({
                where: { groupCard: { id: groupCardId } },
                select: ['id', 'word', 'definition'],
            });
            if (!shareCards.length) {
                return [];
            }
            return shareCards;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async addToShareSection(setCardId: number, setName: string, userId: number): Promise<ShareSection> {
        try {
            const addTo = this.shareSectionRepository.create({
                set_cards_name: setName,
                user: { id: userId } ,
                groupCard: { id: setCardId } ,
            });
            return await this.shareSectionRepository.save(addTo);
        } catch (error) {
            throw new InternalServerErrorException('Error adding card to share section: ' + error.message);
        }
    }

    async removeFromShareSection(cardId: number): Promise<string> {
        try {
            const deleteResult = await this.shareSectionRepository.delete(cardId);
            if (deleteResult.affected === 0) {
                throw new NotFoundException(`No shared card found with ID ${cardId}`);
            }
            return 'Deleted!';
        } catch (error) {
            throw new InternalServerErrorException('Error deleting shared card: ' + error.message);
        }
    }

}
