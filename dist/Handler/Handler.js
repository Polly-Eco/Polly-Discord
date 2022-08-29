"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
class Handler {
    constructor(commands) {
        this.commands = commands;
    }
    async handleInteraction(interaction) {
        const { commandName } = interaction;
        const command = this.commands.get(commandName);
        if (!command) {
            console.log('Not implemented');
            return;
        }
        await command(interaction);
    }
}
exports.Handler = Handler;
//# sourceMappingURL=Handler.js.map