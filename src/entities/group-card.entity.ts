import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Card } from "./card.entity";
import { ShareSection } from "./share-section.entity";

@Entity()
export class GroupCard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.groupCards, { onDelete: "CASCADE" })
    user: User;

    @OneToMany(() => Card, (card) => card.groupCard)
    cards: Card[];

    @OneToMany(() => ShareSection, (shareSection) => shareSection.groupCard, { onDelete: "CASCADE" })
    shareSections: ShareSection[];
}
