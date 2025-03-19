import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { GroupCard } from "./group-card.entity";
import { User } from "./user.entity";

@Entity()
export class ShareSection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    set_cards_name: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => GroupCard, (groupCard) => groupCard.shareSections, { onDelete: "CASCADE" })
    groupCard: GroupCard;

    @ManyToOne(() => User, (user) => user.shareSections)
    user: User;
}
