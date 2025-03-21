import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ShareCardSectionService } from './share-card-section.service';
import { AuthGuard } from '../auth/guard/jwt.guard';
import { CardDto } from 'src/dto/card/card.dto';
import { AddToShareSectionDto } from 'src/dto/share-section/addToShareSection.dto';
import { ShareSectionResponseDto } from 'src/dto/share-section/shareSectionRes.dto';

@Controller('share-card-section')
export class ShareCardSectionController {
    constructor(private shareSectionService: ShareCardSectionService) { }

    @UseGuards(AuthGuard)
    @Get()
    async getShareCard(@Req() req: Request | any): Promise<any> {
        return this.shareSectionService.getSharedCards(req.tokenPayload.id)
    }

    @UseGuards(AuthGuard)
    @Get('friend-set-card/:id')
    async getFriendSetCard(@Param('id') id: number): Promise<any> {
        return this.shareSectionService.getFriendsSetCard(id)
    }

    @UseGuards(AuthGuard)
    @Get('friend-card/:id')
    async getFriendsCard(@Param('id') id: number): Promise<CardDto[]> {
        return this.shareSectionService.getFriendsCard(id);
    }

    @UseGuards(AuthGuard) 
    @Post('add')
    async addToShareSection(
        @Req() req:Request|any, 
        @Body() dto: AddToShareSectionDto,
    ): Promise<any> {
        const userId = req.tokenPayload.id; 
        return this.shareSectionService.addToShareSection(dto.id, dto.name, userId);
    }

    @UseGuards(AuthGuard)
    @Delete('remove-from-section/:cardId')
    async removeFromShareSection(@Param('cardId') cardId: number):Promise<any>{
        return this.shareSectionService.removeFromShareSection(cardId)
    }
}
