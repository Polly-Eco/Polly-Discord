import { SlashCommandBuilder } from 'discord.js';
import { CommandMetaData } from '../shared/interfaces';

export const createCommandFromMetaData = (
	metaData: CommandMetaData
): Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'> => {
	const { name, description, options } = metaData;
	const baseCommand = new SlashCommandBuilder()
		.setName(name)
		.setDescription(description);
	if (options.length > 0) {
		options.forEach(commandOption => {
			baseCommand.addStringOption(option =>
				option
					.setName(commandOption.name)
					.setDescription(commandOption.description)
					.setRequired(commandOption.isRequired)
			);
		});
	}
	return baseCommand;
};
