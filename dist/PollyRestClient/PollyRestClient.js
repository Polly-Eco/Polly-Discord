"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollyRestClient = void 0;
const discord_js_1 = require("discord.js");
class PollyRestClient extends discord_js_1.REST {
    constructor(config) {
        const { options, token, clientId } = config;
        super(options);
        this.clientId = clientId;
        this.setToken(token);
    }
    async removeAllSlashCommands() {
        return this.put(discord_js_1.Routes.applicationCommands(this.clientId), { body: [] })
            .then(() => console.log('Successfully deleted all application commands.'))
            .catch(console.error);
    }
    async addAllSlashCommands(body) {
        return this.put(discord_js_1.Routes.applicationCommands(this.clientId), { body: body })
            .then(() => console.log('Successfully registered application commands.'))
            .catch(console.error);
    }
}
exports.PollyRestClient = PollyRestClient;
//# sourceMappingURL=PollyRestClient.js.map