import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class FriendRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: ["pending", "accepted", "declined"], default: "pending" })
    status: string;

    @ManyToOne(() => User, (user) => user.sentRequests)
    sender: User;

    @ManyToOne(() => User, (user) => user.receivedRequests)
    receiver: User;
}
