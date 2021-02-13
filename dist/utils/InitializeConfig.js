"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
exports.initializeConfig = () => {
    var _a, _b, _c, _d, _e, _f, _g;
    dotenv_1.default.config();
    console.log('Initializing Config');
    const config = {
        PORT: (_a = String(process.env.PORT)) !== null && _a !== void 0 ? _a : '',
        DB_HOST: (_b = process.env.DB_HOST) !== null && _b !== void 0 ? _b : '',
        DB_USERNAME: (_c = process.env.DB_USERNAME) !== null && _c !== void 0 ? _c : '',
        DB_PASSWORD: (_d = process.env.DB_PASSWORD) !== null && _d !== void 0 ? _d : '',
        DB_NAME: (_e = process.env.DB_NAME) !== null && _e !== void 0 ? _e : '',
        LOG_LEVEL: (_f = process.env.LOG_LEVEL) !== null && _f !== void 0 ? _f : '',
        SESSION_SECRET: (_g = process.env.SESSION_SECRET) !== null && _g !== void 0 ? _g : ''
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5pdGlhbGl6ZUNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9Jbml0aWFsaXplQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9EQUE0QjtBQUdmLFFBQUEsZ0JBQWdCLEdBQUcsR0FBeUIsRUFBRTs7SUFDMUQsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUVoQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFFbkMsTUFBTSxNQUFNLEdBQXlCO1FBQ3BDLElBQUksUUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUNBQUksRUFBRTtRQUNwQyxPQUFPLFFBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLG1DQUFJLEVBQUU7UUFDbEMsV0FBVyxRQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxtQ0FBSSxFQUFFO1FBQzFDLFdBQVcsUUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsbUNBQUksRUFBRTtRQUMxQyxPQUFPLFFBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLG1DQUFJLEVBQUU7UUFDbEMsU0FBUyxRQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxtQ0FBSSxFQUFFO1FBQ3RDLGNBQWMsUUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsbUNBQUksRUFBRTtLQUNoRCxDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDLENBQUMifQ==