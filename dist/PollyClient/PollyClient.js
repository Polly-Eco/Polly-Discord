"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollyClient = void 0;
const discord_js_1 = require("discord.js");
class PollyClient extends discord_js_1.Client {
    constructor(pollyOptions) {
        const { options, token, handler } = pollyOptions;
        super(options);
        this.token = token;
        this.handler = handler;
    }
    async start() {
        this.on('interactionCreate', async (interaction) => {
            if (!interaction.isChatInputCommand())
                return;
            await this.handler.handleInteraction(interaction);
        });
        this.once('ready', () => {
            console.log('Polly is ready!');
        });
        this.login(this.token);
    }
}
exports.PollyClient = PollyClient;
//# sourceMappingURL=PollyClient.js.map