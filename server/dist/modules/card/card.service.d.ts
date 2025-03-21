import { CreateCardDto } from 'src/dto/card/create-card.dto';
import { Card } from 'src/entities/card.entity';
import { GroupCard } from 'src/entities/group-card.entity';
import { Repository } from 'typeorm';
export declare class CardService {
    private cardRepository;
    private groupCardRepository;
    constructor(cardRepository: Repository<Card>, groupCardRepository: Repository<GroupCard>);
    createCard(createCardDto: CreateCardDto): Promise<Card>;
    deleteCard(cardId: number): Promise<void>;
    updateCard(id: number, updateCardDto: CreateCardDto): Promise<Card>;
    searchCard(searchQuery: string, groupCardId: number): Promise<Card[]>;
}
