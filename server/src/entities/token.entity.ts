import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    token: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date; 
    
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; 

    @Column({ type: "timestamp" })
    expiresAt: Date;

    @ManyToOne(() => User, (user) => user.token, { onDelete: "CASCADE" })
    user: User;
}
