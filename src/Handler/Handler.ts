import { ChatInputCommandInteraction, Collection } from 'discord.js';
import { Command, CommandExecutor } from '../shared/interfaces';

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
		// const command = this.commands.find((command) => command.getName() === commandName);
		// if (!command) {
		//     console.log('Not implemented');
		//     return;
		// }
		// const result = command.handleCommand([]);
		// console.log(commandName, head, tails);
	}
}
