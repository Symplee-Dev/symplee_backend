"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const debug_sx_1 = __importDefault(require("debug-sx"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
process.env['DEBUG'] = '*::INFO, *::WARN, *::ERR';
exports.logger = debug_sx_1.default.createDefaultLogger('main');
exports.logger.err = debug_sx_1.default('::ERR');
const h = debug_sx_1.default.createConsoleHandler('stdout', '*');
debug_sx_1.default.addHandler(h);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3REFBK0I7QUFDL0Isb0RBQTRCO0FBRTVCLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRywwQkFBMEIsQ0FBQztBQUVyQyxRQUFBLE1BQU0sR0FFZixrQkFBTyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXhDLGNBQU0sQ0FBQyxHQUFHLEdBQUcsa0JBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUU5QixNQUFNLENBQUMsR0FBcUIsa0JBQU8sQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDeEUsa0JBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMifQ==