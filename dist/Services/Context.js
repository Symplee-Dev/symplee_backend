"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = exports.Context = void 0;
const logger_1 = require("../utils/logger");
const apollo_server_1 = require("apollo-server");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Context {
    constructor(req, res) {
        this.request = req;
        this.response = res;
        this.valid = false;
    }
    Initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.session = yield this.checkHeaders();
            return this.serialize();
        });
    }
    checkHeaders() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.request.headers.authorization &&
                this.request.headers.authorization.length > 0) {
                this.token = this.request.headers.authorization;
                const decoded = yield this.validateAndDecodeJWT();
                return decoded;
            }
        });
    }
    validateAndDecodeJWT() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.token) {
                logger_1.logger.err('Error with token!');
                throw new apollo_server_1.AuthenticationError('Error With Token!');
            }
            const decoded = jsonwebtoken_1.default.decode(this.token);
            if (!decoded) {
                logger_1.logger.err('Critical Server Error. No decoded JWT returned!');
                throw new Error('Critical Server Error.');
            }
            return {
                username: decoded.username,
                userId: decoded.userId
            };
        });
    }
    serialize() {
        return {
            token: this.token,
            request: this.request,
            response: this.response,
            valid: this.valid,
            session: this.session
        };
    }
}
exports.Context = Context;
const createContext = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const context = yield new Context(req, res).Initialize();
    return Object.assign(Object.assign({}, context), { logger: logger_1.logger, authenticated: context.session ? true : false });
});
exports.createContext = createContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TZXJ2aWNlcy9Db250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDRDQUF5QztBQUN6QyxpREFBb0Q7QUFDcEQsZ0VBQStCO0FBRS9CLE1BQWEsT0FBTztJQU9uQixZQUFZLEdBQWMsRUFBRSxHQUFlO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFSyxVQUFVOztZQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFekMsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUssWUFBWTs7WUFDakIsSUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDNUM7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7Z0JBQ2hELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7Z0JBRWxELE9BQVEsT0FBOEIsQ0FBQzthQUN2QztRQUNGLENBQUM7S0FBQTtJQUVLLG9CQUFvQjs7WUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hCLGVBQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxJQUFJLG1DQUFtQixDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDbkQ7WUFFRCxNQUFNLE9BQU8sR0FBUSxzQkFBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFNUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDYixlQUFNLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7Z0JBQzlELE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUMxQztZQUVELE9BQU87Z0JBQ04sUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2dCQUMxQixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07YUFDdEIsQ0FBQztRQUNILENBQUM7S0FBQTtJQUVELFNBQVM7UUFDUixPQUFPO1lBQ04sS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUNyQixDQUFDO0lBQ0gsQ0FBQztDQUNEO0FBM0RELDBCQTJEQztBQUVNLE1BQU0sYUFBYSxHQUFHLENBQU8sR0FBYyxFQUFFLEdBQWUsRUFBRSxFQUFFO0lBQ3RFLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBRXpELHVDQUNJLE9BQU8sS0FDVixNQUFNLEVBQU4sZUFBTSxFQUNOLGFBQWEsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFDNUM7QUFDSCxDQUFDLENBQUEsQ0FBQztBQVJXLFFBQUEsYUFBYSxpQkFReEIifQ==