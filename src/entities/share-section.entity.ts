import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { GroupCard } from "./group-card.entity";
import { User } from "./user.entity";

@Entity()
export class ShareSection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    set_cards_name: string;

    @ManyToOne(() => GroupCard, (groupCard) => groupCard.shareSections, { onDelete: "CASCADE" })
    groupCard: GroupCard;

    @ManyToOne(() => User, (user) => user.shareSections)
    user: User;
}
