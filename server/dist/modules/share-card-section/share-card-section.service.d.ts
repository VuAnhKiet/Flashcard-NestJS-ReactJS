import { Card } from 'src/entities/card.entity';
import { ShareSection } from 'src/entities/share-section.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
export declare class ShareCardSectionService {
    private shareSectionRepository;
    private userRepository;
    private cardRepository;
    constructor(shareSectionRepository: Repository<ShareSection>, userRepository: Repository<User>, cardRepository: Repository<Card>);
    getSharedCards(userId: number): Promise<ShareSection[]>;
    getFriendsSetCard(friendId: number): Promise<{
        message: string;
        setcards?: undefined;
        friend_name?: undefined;
    } | {
        setcards: {
            setcardId: number;
            set_cards_name: string;
        }[];
        friend_name: string;
        message?: undefined;
    }>;
    getFriendsCard(groupCardId: number): Promise<Card[]>;
    addToShareSection(setCardId: number, setName: string, userId: number): Promise<ShareSection>;
    removeFromShareSection(cardId: number): Promise<string>;
}
