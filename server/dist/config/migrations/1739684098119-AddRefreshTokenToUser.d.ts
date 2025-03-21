import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddRefreshTokenToUser1739684098119 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
