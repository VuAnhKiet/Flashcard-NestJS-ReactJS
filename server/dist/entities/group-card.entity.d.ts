import { User } from "./user.entity";
import { Card } from "./card.entity";
import { ShareSection } from "./share-section.entity";
export declare class GroupCard {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    cards: Card[];
    shareSections: ShareSection[];
}
