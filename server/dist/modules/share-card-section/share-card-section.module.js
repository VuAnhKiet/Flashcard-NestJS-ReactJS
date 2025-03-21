"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareCardSectionModule = void 0;
const common_1 = require("@nestjs/common");
const share_card_section_service_1 = require("./share-card-section.service");
const share_card_section_controller_1 = require("./share-card-section.controller");
const typeorm_1 = require("@nestjs/typeorm");
const share_section_entity_1 = require("../../entities/share-section.entity");
const user_entity_1 = require("../../entities/user.entity");
const card_entity_1 = require("../../entities/card.entity");
let ShareCardSectionModule = class ShareCardSectionModule {
};
exports.ShareCardSectionModule = ShareCardSectionModule;
exports.ShareCardSectionModule = ShareCardSectionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([share_section_entity_1.ShareSection, user_entity_1.User, card_entity_1.Card])],
        providers: [share_card_section_service_1.ShareCardSectionService],
        controllers: [share_card_section_controller_1.ShareCardSectionController]
    })
], ShareCardSectionModule);
//# sourceMappingURL=share-card-section.module.js.map