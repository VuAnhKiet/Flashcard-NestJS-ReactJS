import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/jwt.guard';
import { CardService } from './card.service';
import { CreateCardDto } from 'src/dto/card/create-card.dto';

@Controller('cards')
@UseGuards(AuthGuard)
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async createCard(@Body() createCardDto: CreateCardDto) {
    return this.cardService.createCard(createCardDto);
  }

  @Delete(':cardId')
  async deleteCard(@Param('cardId') cardId: number) {
    await this.cardService.deleteCard(cardId);
    return { message: 'Card deleted successfully!' };
  }

  //Bug
  @Put(':id')
  async updateCard(@Param('id') id: number, @Body() updateCardDto: CreateCardDto) {
    return this.cardService.updateCard(id, updateCardDto);
  }

  @Get('search')
  async searchCard(@Query('s') searchQuery: string, @Query('groupCardId') groupCardId: number) {
    return this.cardService.searchCard(searchQuery, groupCardId);
  }
}