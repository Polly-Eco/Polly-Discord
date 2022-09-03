import { ChatInputCommandInteraction } from 'discord.js';
import { CoinFlip } from '../Features/CoinFlip/CoinFlip';
import {
	CoinDto,
	CoinSide,
	CoinSides,
} from '../Features/CoinFlip/coinFlip.types';
import { createCommandFromMetaData } from '../helpers/commandCreator';
import { wait } from '../helpers/wait';
import { CommandNames } from '../shared/constants';
import { Command, CommandMetaData } from '../shared/interfaces';

export const coinFlipMetaData: CommandMetaData = {
	name: CommandNames.COINFLIP,
	description: 'Toss a coin, get head or tails',
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

const coinFlip = new CoinFlip();

const data = createCommandFromMetaData(coinFlipMetaData);

const execute = async (interaction: ChatInputCommandInteraction) => {
	const headValue = interaction.options.getString('head', false);
	const head: CoinSide = {
		isCustom: headValue && headValue.length > 0,
		side: headValue,
	};
	const tailsValue = interaction.options.getString('tails', false);
	const tails: CoinSide = {
		isCustom: tailsValue && tailsValue.length > 0,
		side: tailsValue,
	};
	const coin: CoinDto = {
		head,
		tails,
	};
	const { plot, result } = await coinFlip.tossACoin(coin);
	await interaction.reply(plot);
	await wait(1000);
	await interaction.followUp(result);
};

export const command: Command = {
	data,
	execute,
};
