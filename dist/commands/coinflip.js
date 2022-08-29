"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = exports.coinFlipMetaData = void 0;
const CoinFlip_1 = require("../Features/CoinFlip/CoinFlip");
const commandCreator_1 = require("../helpers/commandCreator");
const wait_1 = require("../helpers/wait");
const constants_1 = require("../shared/constants");
exports.coinFlipMetaData = {
    name: constants_1.CommandNames.COINFLIP,
    description: 'Gives you head or tails',
    options: [
        {
            name: CoinFlip_1.CoinSides.HEAD,
            description: 'set the head value if you desire',
            isRequired: false,
        },
        {
            name: CoinFlip_1.CoinSides.TAILS,
            description: 'set the tails value if you desire',
            isRequired: false,
        },
    ],
};
const data = (0, commandCreator_1.createCommandFromMetaData)(exports.coinFlipMetaData);
const execute = async (interaction) => {
    const head = interaction.options.getString('head', false);
    const tails = interaction.options.getString('tails', false);
    const { replyOne, replyTwo } = new CoinFlip_1.CoinFlip(head, tails).handleCommand();
    await interaction.reply(replyOne);
    await (0, wait_1.wait)(1000);
    await interaction.followUp(replyTwo);
};
exports.command = {
    data,
    execute,
};
//# sourceMappingURL=coinflip.js.map