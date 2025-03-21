"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareSection = void 0;
const typeorm_1 = require("typeorm");
const group_card_entity_1 = require("./group-card.entity");
const user_entity_1 = require("./user.entity");
let ShareSection = class ShareSection {
};
exports.ShareSection = ShareSection;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ShareSection.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ShareSection.prototype, "set_cards_name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ShareSection.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ShareSection.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_card_entity_1.GroupCard, (groupCard) => groupCard.shareSections, { onDelete: "CASCADE" }),
    __metadata("design:type", group_card_entity_1.GroupCard)
], ShareSection.prototype, "groupCard", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.shareSections),
    __metadata("design:type", user_entity_1.User)
], ShareSection.prototype, "user", void 0);
exports.ShareSection = ShareSection = __decorate([
    (0, typeorm_1.Entity)()
], ShareSection);
//# sourceMappingURL=share-section.entity.js.map