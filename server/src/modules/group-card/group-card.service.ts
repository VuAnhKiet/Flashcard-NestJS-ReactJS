import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupCardDto } from 'src/dto/group-card/create-groupcard.dto';
import { UpdateGroupCardDto } from 'src/dto/group-card/update-groupcard.dto';
import { Card } from 'src/entities/card.entity';
import { GroupCard } from 'src/entities/group-card.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class GroupCardService {
    constructor(
        @InjectRepository(GroupCard) private groupCardRepository: Repository<GroupCard>,
        @InjectRepository(Card) private cardRepository: Repository<Card>
    ) { }

    async getGroupCards(userId: number): Promise<GroupCard[]> {
        try {
            const listOfSetCards = await this.groupCardRepository.find({
                where: { user: { id: userId } },
            });

            return listOfSetCards;
        } catch (error) {
            throw new InternalServerErrorException('Error fetching group cards: ' + error.message);
        }
    }

    async getCardsByGroupId(groupCardId: number): Promise<Card[]> {
        try {
            const setcards = await this.cardRepository.find({
                where: { groupCard: { id: groupCardId } },
            });

            if (!setcards.length) {
                return [];
            }

            return setcards;
        } catch (error) {
            throw new InternalServerErrorException('Error fetching cards: ' + error.message);
        }
    }

    async createGroupCard(createGroupCardDto: CreateGroupCardDto, userId: number): Promise<GroupCard> {
        try {
            const newGroupCard = this.groupCardRepository.create({
                name: createGroupCardDto.name,
                user: { id: userId },
            });

            return await this.groupCardRepository.save(newGroupCard);
        } catch (error) {
            throw new InternalServerErrorException('Error creating group card: ' + error.message);
        }
    }

    async deleteGroupCard(id: number, userId: number): Promise<void> {
        try {
            const groupCard = await this.groupCardRepository.findOne({ where: { id, user: { id: userId } } });

            if (!groupCard) {
                throw new NotFoundException('Group card not found or you are not authorized to delete it');
            }

            await this.groupCardRepository.remove(groupCard);

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error deleting group card: ' + error.message);
        }
    }

    async updateGroupCard(id: number, updateGroupCardDto: UpdateGroupCardDto, userId: number): Promise<GroupCard> {
        try {
            const groupCard = await this.groupCardRepository.findOne({ where: { id, user: { id: userId } } });
            if (!groupCard) {
                throw new NotFoundException('Group card not found or you are not authorized to update it');
            }
            groupCard.name = updateGroupCardDto.name;
            return await this.groupCardRepository.save(groupCard);
        } catch (error) {
            throw new InternalServerErrorException('Error updating group card: ' + error.message);
        }
    }

    async searchGroupCard(searchTerm: string, userId: number): Promise<GroupCard[]> {
        try {
          if (!searchTerm) {
            throw new BadRequestException('Please fill in before searching');
          }
    
          const result = await this.groupCardRepository.find({
            where: {
              name: Like(`%${searchTerm}%`),
              user: { id: userId },
            },
          });
    
          if (result.length === 0) {
            throw new NotFoundException('No items found matching your search criteria.');
          }
    
          return result;
        } catch (error) {
          throw new InternalServerErrorException('Error searching group cards: ' + error.message);
        }
      }

}
