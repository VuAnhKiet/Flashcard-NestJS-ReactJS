import { GroupCard } from "./group-card.entity";
import { User } from "./user.entity";
export declare class ShareSection {
    id: number;
    set_cards_name: string;
    createdAt: Date;
    updatedAt: Date;
    groupCard: GroupCard;
    user: User;
}
