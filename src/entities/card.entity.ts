import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { GroupCard } from "./group-card.entity";

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    word: string;

    @Column()
    definition: string;

    @ManyToOne(() => GroupCard, (groupCard) => groupCard.cards, { onDelete: "CASCADE" })
    groupCard: GroupCard;
}
