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
exports.Config = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const InitializeConfig_1 = require("./utils/InitializeConfig");
const logger_1 = require("./utils/logger");
const Context_1 = require("./Services/Context");
const InitializeMiddleware_1 = __importDefault(require("./utils/InitializeMiddleware"));
const typeDefs_1 = require("./schema/typeDefs");
const index_1 = require("./resolvers/index");
const dotenv_1 = __importDefault(require("dotenv"));
// Init Config Variables
dotenv_1.default.config();
exports.Config = InitializeConfig_1.initializeConfig();
const PORT = process.env.PORT;
console.log('Starting Server....');
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: index_1.resolvers,
    context: ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.logger.info('Running Context');
        return yield Context_1.createContext(req, res);
    })
});
const app = express_1.default();
InitializeMiddleware_1.default(app);
console.log(exports.Config);
app.listen({ port: exports.Config.PORT }, () => console.info(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQXFEO0FBQ3JELHNEQUE4QjtBQUU5QiwrREFBNEQ7QUFDNUQsMkNBQXdDO0FBQ3hDLGdEQUFtRDtBQUNuRCx3RkFBZ0U7QUFDaEUsZ0RBQTZDO0FBQzdDLDZDQUE4QztBQUM5QyxvREFBNEI7QUFFNUIsd0JBQXdCO0FBQ3hCLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDSCxRQUFBLE1BQU0sR0FBRyxtQ0FBZ0IsRUFBRSxDQUFDO0FBRXpDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBRTlCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUVuQyxNQUFNLE1BQU0sR0FBRyxJQUFJLG9DQUFZLENBQUM7SUFDL0IsUUFBUSxFQUFFLG1CQUFRO0lBQ2xCLFNBQVMsRUFBRSxpQkFBUztJQUNwQixPQUFPLEVBQUUsQ0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQXVDLEVBQUUsRUFBRTtRQUNwRSxlQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDL0IsT0FBTyxNQUFNLHVCQUFhLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQTtDQUNELENBQUMsQ0FBQztBQUVILE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUV0Qiw4QkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUUxQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQU0sQ0FBQyxDQUFDO0FBRXBCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBTSxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUN0QyxPQUFPLENBQUMsSUFBSSxDQUNYLHVDQUF1QyxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUNsRSxDQUNELENBQUMifQ==