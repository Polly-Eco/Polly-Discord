import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { CommandNames } from './constants';

export type CommandExecutor = (
	interaction: ChatInputCommandInteraction
) => Promise<void>;

export interface Command {
	data: Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>;
	execute: CommandExecutor;
}

export interface OptionMetaData {
	name: string;
	description: string;
	isRequired: boolean;
}

export interface CommandMetaData {
	name: CommandNames;
	description: string;
	options: OptionMetaData[];
}
