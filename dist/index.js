"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const Handler_1 = require("./Handler/Handler");
const PollyClient_1 = require("./PollyClient/PollyClient");
const path_1 = __importDefault(require("path"));
const PollyRestClient_1 = require("./PollyRestClient/PollyRestClient");
const constants_1 = require("./shared/constants");
const getAppConfig_1 = require("./helpers/getAppConfig");
const Prelaunch_1 = require("./Prelaunch/Prelaunch");
const Database_1 = require("./Features/Database/Database");
(async () => {
    const appConfig = await (0, getAppConfig_1.getAppConfig)();
    const { token, clientId, options } = appConfig;
    const db = new Database_1.Database(options);
    await db.tryConn();
    await db.setupDatabase();
    return;
    const prelaunch = new Prelaunch_1.Prelaunch(path_1.default.join(__dirname, constants_1.PATH_TO_COMMANDS), appConfig, new PollyRestClient_1.PollyRestClient({
        options: {
            version: '10'
        },
        token,
        clientId,
    }));
    const commands = await prelaunch.getCommands();
    const commandsCollection = prelaunch.getCommandsCollection(commands);
    await prelaunch.updateSlashCommands(commands);
    const handler = new Handler_1.Handler(commandsCollection);
    const config = {
        options: {
            intents: [discord_js_1.GatewayIntentBits.Guilds],
        },
        token,
        handler,
    };
    const client = new PollyClient_1.PollyClient(config);
    client.start();
})();
//# sourceMappingURL=index.js.map