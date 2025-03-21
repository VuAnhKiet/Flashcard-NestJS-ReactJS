import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddUniqueToUserName1741796490938 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
