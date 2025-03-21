import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCardDto } from 'src/dto/card/create-card.dto';
import { Card } from 'src/entities/card.entity';
import { GroupCard } from 'src/entities/group-card.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    @InjectRepository(GroupCard) private groupCardRepository: Repository<GroupCard>,
  ) { }

  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    try {
      const groupCard = await this.groupCardRepository.findOne({
        where:{id: createCardDto.groupCardId}
      });
      if (!groupCard) {
        throw new NotFoundException('Group card not found');
      }
      const newCard = this.cardRepository.create({
        ...createCardDto,
        groupCard,
      });
      return await this.cardRepository.save(newCard);
    } catch (error) {
      throw new InternalServerErrorException('Error creating card: ' + error.message);
    }
  }

  async deleteCard(cardId: number): Promise<void> {
    try {
      const result = await this.cardRepository.delete(cardId);
      if (result.affected === 0) {
        throw new NotFoundException('Card not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Error deleting card: ' + error.message);
    }
  }

  async updateCard(id: number, updateCardDto: CreateCardDto): Promise<Card> {
    try {
      const card = await this.cardRepository.findOne({
        where:{id}
      });
      if (!card) {
        throw new NotFoundException('Card not found');
      }
      Object.assign(card, updateCardDto);
      return await this.cardRepository.save(card);
    } catch (error) {
      throw new InternalServerErrorException('Error updating card: ' + error.message);
    }
  }

  async searchCard(searchQuery: string, groupCardId: number): Promise<Card[]> {
    try {
      return await this.cardRepository.find({
        where: {
          word: Like(`%${searchQuery}%`),
          groupCard: { id: groupCardId },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error searching for card: ' + error.message);
    }
  }
}
