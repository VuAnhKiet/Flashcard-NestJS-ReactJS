import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    Req,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard/jwt.guard';
import { SearchFriendResponseDto } from 'src/dto/friend/search-friend.dto';
import { FriendDto } from 'src/dto/friend/friend.dto';
import { SendFriendRequestDto } from 'src/dto/friend/send-friend-request.dto';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private userService: UserService) { }

    @Get('get-friends')
    async getFriends(@Req() req: Request | any): Promise<FriendDto[]> {
        const userId = req.tokenPayload.id;
        return this.userService.getFriend(userId);
    }

    @Get('search-friends')
    async searchFriends(
        @Query('s') searchTerm: string,
        @Req() req: Request | any
    ): Promise<SearchFriendResponseDto> {
        const userId = req.tokenPayload.id;
        return this.userService.searchFriends(userId, searchTerm);
    }

    @Post('send-request')
    async sendFriendRequest(
        @Body() sendFriendRequestDto: SendFriendRequestDto,
        @Req() req: Request | any,
    ): Promise<{ message: string }> {
        const userId = req.tokenPayload.id;
        const { receiverId } = sendFriendRequestDto;
        await this.userService.sendRequest(userId, receiverId);
        return { message: 'Waiting for accepting request' };
    }

    @Get('pending')
    async getPendingFriend(@Req() req: Request | any) {
        const userId = req.tokenPayload.id;
        const pendingFriends = await this.userService.getPendingFriends(userId);
        return pendingFriends;
    }

    @Put('accept/:id')
    async acceptFriendRequest(
        @Param('id') requestId: number,
        @Req() req: Request | any,
    ) {
        const userId = req.tokenPayload.id;
        const result = await this.userService.acceptFriendRequest(userId, requestId);
        return result;
    }

    @Put('reject/:id')
    async rejectFriendRequest(
        @Param('id') requestId: number,
        @Req() req: Request | any,
    ) {
        const userId = req.tokenPayload.id;
        const result = await this.userService.rejectFriendRequest(userId, requestId);
        return { message: 'Friend request rejected', data: result };
    }

    @Delete('unfriend/:id')
    async unfriend(@Param('id') targetUserId: number, @Req() req: Request | any) {
        const userId = req.tokenPayload.id;
        const result = await this.userService.unfriend(userId, targetUserId);
        return { message: result };
    }
}

