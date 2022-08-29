"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prelaunch = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const discord_js_1 = require("discord.js");
class Prelaunch {
    constructor(pathToCommands, appConfig, pollyRest) {
        this.commandsPath = pathToCommands;
        this.appConfig = appConfig;
        this.pollyRest = pollyRest;
    }
    async getCommands() {
        const commandFiles = (await promises_1.default
            .readdir(this.commandsPath))
            .filter(file => file.endsWith('.ts'));
        const commandsPromises = commandFiles.map((commandFile) => {
            const filePath = path_1.default.join(this.commandsPath, commandFile);
            return Promise.resolve().then(() => __importStar(require(filePath)));
        });
        const commands = (await Promise.all(commandsPromises)).map(data => data.command);
        return commands;
    }
    getCommandsCollection(commands) {
        const commandsCollection = new discord_js_1.Collection();
        commands.forEach(({ data, execute }) => commandsCollection.set(data.name, execute));
        return commandsCollection;
    }
    async updateSlashCommands(commands) {
        const body = commands.map(({ data }) => data.toJSON());
        const { isUpdateRequired } = this.appConfig;
        if (isUpdateRequired) {
            await this.pollyRest.removeAllSlashCommands();
            await this.pollyRest.addAllSlashCommands(body);
        }
    }
}
exports.Prelaunch = Prelaunch;
//# sourceMappingURL=Prelaunch.js.map