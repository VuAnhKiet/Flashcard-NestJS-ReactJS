import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { GroupCardService } from './group-card.service';
import { AuthGuard } from '../auth/guard/jwt.guard';
import { CreateGroupCardDto } from 'src/dto/group-card/create-groupcard.dto';
import { UpdateGroupCardDto } from 'src/dto/group-card/update-groupcard.dto';

@Controller('group-card')
@UseGuards(AuthGuard)
export class GroupCardController {
    constructor(private groupCardService: GroupCardService) { }

    @Get()
    async getGroupCard(@Req() req: Request | any): Promise<any> {
        const userId = req.tokenPayload.id;
        return this.groupCardService.getGroupCards(userId);
    }

    @Get('byId/:id')
    async getCardsByGroupId(@Param('id') id: number) {
        return this.groupCardService.getCardsByGroupId(id);
    }

    @Post()
    async createGroupCard(@Body() createGroupCardDto: CreateGroupCardDto, @Req() req: Request | any) {
        const userId = req.tokenPayload.id;
        return this.groupCardService.createGroupCard(createGroupCardDto, userId);
    }

    @Delete(':id')
    async deleteGroupCard(@Param('id') id: number, @Req() req: Request | any) {
        const userId = req.tokenPayload.id;
        return this.groupCardService.deleteGroupCard(id, userId);
    }

    @Put(':id')
    async updateGroupCard(
        @Param('id') id: number, 
        @Body() updateGroupCardDto: UpdateGroupCardDto, 
        @Req() req:Request|any
    ) {
        const userId = req.tokenPayload.id;
        return this.groupCardService.updateGroupCard(id, updateGroupCardDto, userId);
    }

    @Get('search')
    async searchGroupCard(@Query('s') searchTerm: string, @Req() req:Request|any) {
        const userId = req.tokenPayload.id;
        return this.groupCardService.searchGroupCard(searchTerm, userId);
    }
}
