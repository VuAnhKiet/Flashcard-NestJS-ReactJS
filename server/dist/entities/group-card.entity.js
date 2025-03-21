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
exports.GroupCard = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const card_entity_1 = require("./card.entity");
const share_section_entity_1 = require("./share-section.entity");
let GroupCard = class GroupCard {
};
exports.GroupCard = GroupCard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GroupCard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GroupCard.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], GroupCard.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], GroupCard.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.groupCards, { onDelete: "CASCADE" }),
    __metadata("design:type", user_entity_1.User)
], GroupCard.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => card_entity_1.Card, (card) => card.groupCard),
    __metadata("design:type", Array)
], GroupCard.prototype, "cards", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => share_section_entity_1.ShareSection, (shareSection) => shareSection.groupCard, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], GroupCard.prototype, "shareSections", void 0);
exports.GroupCard = GroupCard = __decorate([
    (0, typeorm_1.Entity)()
], GroupCard);
//# sourceMappingURL=group-card.entity.js.map