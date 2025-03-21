import { ShareCardSectionService } from './share-card-section.service';
import { CardDto } from 'src/dto/card/card.dto';
import { AddToShareSectionDto } from 'src/dto/share-section/addToShareSection.dto';
export declare class ShareCardSectionController {
    private shareSectionService;
    constructor(shareSectionService: ShareCardSectionService);
    getShareCard(req: Request | any): Promise<any>;
    getFriendSetCard(id: number): Promise<any>;
    getFriendsCard(id: number): Promise<CardDto[]>;
    addToShareSection(req: Request | any, dto: AddToShareSectionDto): Promise<any>;
    removeFromShareSection(cardId: number): Promise<any>;
}
