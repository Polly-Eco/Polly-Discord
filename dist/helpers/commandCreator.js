"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommandFromMetaData = void 0;
const discord_js_1 = require("discord.js");
const createCommandFromMetaData = (metaData) => {
    const { name, description, options } = metaData;
    const baseCommand = new discord_js_1.SlashCommandBuilder()
        .setName(name)
        .setDescription(description);
    if (options.length > 0) {
        options.forEach(commandOption => {
            baseCommand.addStringOption(option => option
                .setName(commandOption.name)
                .setDescription(commandOption.description)
                .setRequired(commandOption.isRequired));
        });
    }
    return baseCommand;
};
exports.createCommandFromMetaData = createCommandFromMetaData;
//# sourceMappingURL=commandCreator.js.map