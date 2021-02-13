"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const debug_sx_1 = __importDefault(require("debug-sx"));
exports.logger = {
    info: debug_sx_1.default('main::INFO'),
    warn: debug_sx_1.default('main::WARN'),
    err: debug_sx_1.default('main::ERR')
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3REFBK0I7QUFFbEIsUUFBQSxNQUFNLEdBQXFCO0lBQ3ZDLElBQUksRUFBRSxrQkFBTyxDQUFDLFlBQVksQ0FBQztJQUMzQixJQUFJLEVBQUUsa0JBQU8sQ0FBQyxZQUFZLENBQUM7SUFDM0IsR0FBRyxFQUFFLGtCQUFPLENBQUMsV0FBVyxDQUFDO0NBQ3pCLENBQUMifQ==