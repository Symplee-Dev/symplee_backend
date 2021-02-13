"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("../index");
const initializeMiddleware = (app) => {
    app.use(cors_1.default());
    dotenv_1.default.config();
    if (process.env.NODE_ENV === 'development') {
        switch (index_1.Config.LOG_LEVEL) {
            case 'ALL':
                app.use(morgan_1.default('default'));
                break;
            case 'MINIMAL':
                app.use(morgan_1.default('dev'));
                break;
            default:
                'NONE';
                break;
        }
    }
};
exports.default = initializeMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5pdGlhbGl6ZU1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvSW5pdGlhbGl6ZU1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsb0RBQTRCO0FBRTVCLG9EQUE0QjtBQUM1QixvQ0FBa0M7QUFFbEMsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLEdBQWtCLEVBQUUsRUFBRTtJQUNuRCxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQUksRUFBRSxDQUFDLENBQUM7SUFFaEIsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUVoQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLGFBQWEsRUFBRTtRQUMzQyxRQUFRLGNBQU0sQ0FBQyxTQUFTLEVBQUU7WUFDekIsS0FBSyxLQUFLO2dCQUNULEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNO1lBQ1AsS0FBSyxTQUFTO2dCQUNiLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixNQUFNO1lBQ1A7Z0JBQ0MsTUFBTSxDQUFDO2dCQUNQLE1BQU07U0FDUDtLQUNEO0FBQ0YsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsb0JBQW9CLENBQUMifQ==