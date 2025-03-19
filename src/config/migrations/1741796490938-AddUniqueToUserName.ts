import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueToUserName1741796490938 implements MigrationInterface {
    name = 'AddUniqueToUserName1741796490938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_d82ac8613a7ccbd2669896ecc8e" UNIQUE ("fullname")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_d82ac8613a7ccbd2669896ecc8e"`);
    }

}
