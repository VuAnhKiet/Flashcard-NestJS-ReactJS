import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class FriendRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: ["pending", "accepted", "declined"], default: "pending" })
    status: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.sentRequests)
    sender: User;

    @ManyToOne(() => User, (user) => user.receivedRequests)
    receiver: User;
}
