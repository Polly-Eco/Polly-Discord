import { Client, ClientOptions } from 'discord.js';
import { Handler } from '../Handler/Handler';

export interface Config {
	options: ClientOptions;
	token: string;
	handler: Handler;
}

export class PollyClient extends Client {
	readonly token: string;
	readonly handler: Handler;
	constructor(pollyOptions: Config) {
		const { options, token, handler } = pollyOptions;

		super(options);
		this.token = token;
		this.handler = handler;
	}

	public async start() {
		this.on('interactionCreate', async interaction => {
			if (!interaction.isChatInputCommand()) return;
			await this.handler.handleInteraction(interaction);
		});
		this.once('ready', () => {
			console.log('Polly is ready!');
		});
		this.login(this.token);
	}
}
