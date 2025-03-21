import { GroupCard } from "./group-card.entity";
import { FriendRequest } from "./friend-request.entity";
import { ShareSection } from "./share-section.entity";
import { Token } from "./token.entity";
export declare class User {
    id: number;
    fullname: string;
    password: string;
    email: string;
    refreshToken?: string | null;
    createdAt: Date;
    updatedAt: Date;
    groupCards: GroupCard[];
    sentRequests: FriendRequest[];
    receivedRequests: FriendRequest[];
    shareSections: ShareSection[];
    token: Token;
}
