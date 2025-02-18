import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    token: string;

    @Column({ type: "timestamp" })
    expiresAt: Date;

    @ManyToOne(() => User, (user) => user.token, { onDelete: "CASCADE" })
    user: User;
}
