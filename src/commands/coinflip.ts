import { ChatInputCommandInteraction } from 'discord.js';
import { CoinFlip, CoinSides } from '../Features/CoinFlip/CoinFlip';
import { createCommandFromMetaData } from '../helpers/commandCreator';
import { wait } from '../helpers/wait';
import { CommandNames } from '../shared/constants';
import { Command, CommandMetaData } from '../shared/interfaces';

export const coinFlipMetaData: CommandMetaData = {
	name: CommandNames.COINFLIP,
	description: 'Gives you head or tails',
	options: [
		{
			name: CoinSides.HEAD,
			description: 'set the head value if you desire',
			isRequired: false,
		},
		{
			name: CoinSides.TAILS,
			description: 'set the tails value if you desire',
			isRequired: false,
		},
	],
};

const data = createCommandFromMetaData(coinFlipMetaData);

const execute = async (interaction: ChatInputCommandInteraction) => {
	const head = interaction.options.getString('head', false);
	const tails = interaction.options.getString('tails', false);
	const { replyOne, replyTwo } = new CoinFlip(head, tails).handleCommand();
	await interaction.reply(replyOne);
	await wait(1000);
	await interaction.followUp(replyTwo);
};

export const command: Command = {
	data,
	execute,
};
