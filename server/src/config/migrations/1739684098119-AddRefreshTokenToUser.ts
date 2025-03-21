import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenToUser1739684098119 implements MigrationInterface {
    name = 'AddRefreshTokenToUser1739684098119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "card" ("id" SERIAL NOT NULL, "word" character varying NOT NULL, "definition" character varying NOT NULL, "groupCardId" integer, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "share_section" ("id" SERIAL NOT NULL, "set_cards_name" character varying NOT NULL, "groupCardId" integer, "userId" integer, CONSTRAINT "PK_d04d6faecd6fbb39788f722ad7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_card" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_00d405cea09d465311f0a00cad0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friend_request" ("id" SERIAL NOT NULL, "status" "public"."friend_request_status_enum" NOT NULL DEFAULT 'pending', "senderId" integer, "receiverId" integer, CONSTRAINT "PK_4c9d23ff394888750cf66cac17c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "UQ_d9959ee7e17e2293893444ea371" UNIQUE ("token"), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "refreshToken" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_f0e5a96d4137f197facf90af7aa" FOREIGN KEY ("groupCardId") REFERENCES "group_card"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "share_section" ADD CONSTRAINT "FK_717398dcf1dc20424875bc353bb" FOREIGN KEY ("groupCardId") REFERENCES "group_card"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "share_section" ADD CONSTRAINT "FK_566d86b0475e27b1f41c3b4e457" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_card" ADD CONSTRAINT "FK_49a14cecbb5264fcc731445c8a7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_9509b72f50f495668bae3c0171c" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_470e723fdad9d6f4981ab2481eb" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_470e723fdad9d6f4981ab2481eb"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_9509b72f50f495668bae3c0171c"`);
        await queryRunner.query(`ALTER TABLE "group_card" DROP CONSTRAINT "FK_49a14cecbb5264fcc731445c8a7"`);
        await queryRunner.query(`ALTER TABLE "share_section" DROP CONSTRAINT "FK_566d86b0475e27b1f41c3b4e457"`);
        await queryRunner.query(`ALTER TABLE "share_section" DROP CONSTRAINT "FK_717398dcf1dc20424875bc353bb"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_f0e5a96d4137f197facf90af7aa"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "friend_request"`);
        await queryRunner.query(`DROP TABLE "group_card"`);
        await queryRunner.query(`DROP TABLE "share_section"`);
        await queryRunner.query(`DROP TABLE "card"`);
    }

}
