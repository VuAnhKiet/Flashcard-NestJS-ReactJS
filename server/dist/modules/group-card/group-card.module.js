"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupCardModule = void 0;
const common_1 = require("@nestjs/common");
const group_card_service_1 = require("./group-card.service");
const group_card_controller_1 = require("./group-card.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const card_entity_1 = require("../../entities/card.entity");
const group_card_entity_1 = require("../../entities/group-card.entity");
let GroupCardModule = class GroupCardModule {
};
exports.GroupCardModule = GroupCardModule;
exports.GroupCardModule = GroupCardModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, card_entity_1.Card, group_card_entity_1.GroupCard])],
        providers: [group_card_service_1.GroupCardService],
        controllers: [group_card_controller_1.GroupCardController]
    })
], GroupCardModule);
//# sourceMappingURL=group-card.module.js.map