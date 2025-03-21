import { GroupCardService } from './group-card.service';
import { CreateGroupCardDto } from 'src/dto/group-card/create-groupcard.dto';
import { UpdateGroupCardDto } from 'src/dto/group-card/update-groupcard.dto';
export declare class GroupCardController {
    private groupCardService;
    constructor(groupCardService: GroupCardService);
    getGroupCard(req: Request | any): Promise<any>;
    getCardsByGroupId(id: number): Promise<import("../../entities/card.entity").Card[]>;
    createGroupCard(createGroupCardDto: CreateGroupCardDto, req: Request | any): Promise<import("../../entities/group-card.entity").GroupCard>;
    deleteGroupCard(id: number, req: Request | any): Promise<void>;
    updateGroupCard(id: number, updateGroupCardDto: UpdateGroupCardDto, req: Request | any): Promise<import("../../entities/group-card.entity").GroupCard>;
    searchGroupCard(searchTerm: string, req: Request | any): Promise<import("../../entities/group-card.entity").GroupCard[]>;
}
