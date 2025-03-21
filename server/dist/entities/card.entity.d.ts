import { GroupCard } from "./group-card.entity";
export declare class Card {
    id: number;
    word: string;
    definition: string;
    createdAt: Date;
    updatedAt: Date;
    groupCard: GroupCard;
}
