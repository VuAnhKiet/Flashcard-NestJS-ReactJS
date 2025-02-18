import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { GroupCard } from "./group-card.entity";
import { FriendRequest } from "./friend-request.entity";
import { ShareSection } from "./share-section.entity";
import { Token } from "./token.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true }) 
    refreshToken?: string;

    @OneToMany(() => GroupCard, (groupCard) => groupCard.user)
    groupCards: GroupCard[];

    @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.sender)
    sentRequests: FriendRequest[];

    @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.receiver)
    receivedRequests: FriendRequest[];

    @OneToMany(() => ShareSection, (shareSection) => shareSection.user)
    shareSections: ShareSection[];

    @OneToOne(() => Token, (token) => token.user, { cascade: true })
    token: Token;
}
