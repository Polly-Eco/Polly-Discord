import { ChatInputCommandInteraction, Collection } from 'discord.js';
import { CommandExecutor } from '../shared/interfaces';

export class Handler {
	private commands: Collection<string, CommandExecutor>;
	constructor(commands: Collection<string, CommandExecutor>) {
		this.commands = commands;
	}

	async handleInteraction(interaction: ChatInputCommandInteraction) {
		const { commandName } = interaction;
		const command = this.commands.get(commandName);
		if (!command) {
			console.log('Not implemented');
			return;
		}
		await command(interaction);
	}
}
