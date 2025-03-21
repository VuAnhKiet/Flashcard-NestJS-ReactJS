import { CardService } from './card.service';
import { CreateCardDto } from 'src/dto/card/create-card.dto';
export declare class CardController {
    private readonly cardService;
    constructor(cardService: CardService);
    createCard(createCardDto: CreateCardDto): Promise<import("../../entities/card.entity").Card>;
    deleteCard(cardId: number): Promise<{
        message: string;
    }>;
    updateCard(id: number, updateCardDto: CreateCardDto): Promise<import("../../entities/card.entity").Card>;
    searchCard(searchQuery: string, groupCardId: number): Promise<import("../../entities/card.entity").Card[]>;
}
