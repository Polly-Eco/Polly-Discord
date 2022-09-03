import { Client, ClientOptions } from 'discord.js';
import { Handler } from '../Handler/Handler';
import { AppConfig } from '../helpers/getAppConfig';

export interface PollyClientConfig {
	options: ClientOptions;
	appConfig: AppConfig;
	handler: Handler;
}

export class PollyClient extends Client {
	readonly token: string;
	readonly handler: Handler;
	constructor(pollyOptions: PollyClientConfig) {
		const { options, appConfig, handler } = pollyOptions;
		const { token } = appConfig;
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
