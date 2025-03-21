import { CreateGroupCardDto } from 'src/dto/group-card/create-groupcard.dto';
import { UpdateGroupCardDto } from 'src/dto/group-card/update-groupcard.dto';
import { Card } from 'src/entities/card.entity';
import { GroupCard } from 'src/entities/group-card.entity';
import { Repository } from 'typeorm';
export declare class GroupCardService {
    private groupCardRepository;
    private cardRepository;
    constructor(groupCardRepository: Repository<GroupCard>, cardRepository: Repository<Card>);
    getGroupCards(userId: number): Promise<GroupCard[]>;
    getCardsByGroupId(groupCardId: number): Promise<Card[]>;
    createGroupCard(createGroupCardDto: CreateGroupCardDto, userId: number): Promise<GroupCard>;
    deleteGroupCard(id: number, userId: number): Promise<void>;
    updateGroupCard(id: number, updateGroupCardDto: UpdateGroupCardDto, userId: number): Promise<GroupCard>;
    searchGroupCard(searchTerm: string, userId: number): Promise<GroupCard[]>;
}
