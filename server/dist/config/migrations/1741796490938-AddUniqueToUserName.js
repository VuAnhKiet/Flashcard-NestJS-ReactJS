"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUniqueToUserName1741796490938 = void 0;
class AddUniqueToUserName1741796490938 {
    constructor() {
        this.name = 'AddUniqueToUserName1741796490938';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_d82ac8613a7ccbd2669896ecc8e" UNIQUE ("fullname")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_d82ac8613a7ccbd2669896ecc8e"`);
    }
}
exports.AddUniqueToUserName1741796490938 = AddUniqueToUserName1741796490938;
//# sourceMappingURL=1741796490938-AddUniqueToUserName.js.map