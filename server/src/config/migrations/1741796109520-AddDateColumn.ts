import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateColumn1741796109520 implements MigrationInterface {
    name = 'AddDateColumn1741796109520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend_request" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "token" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "token" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "card" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "card" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "group_card" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "group_card" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "share_section" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "share_section" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "share_section" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "share_section" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "group_card" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "group_card" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP COLUMN "createdAt"`);
    }

}
