import {
	REST,
	RESTOptions,
	RESTPostAPIApplicationCommandsJSONBody,
	Routes,
} from 'discord.js';

export interface PollyRestClientConfig {
	options: Partial<RESTOptions>;
	token: string;
	clientId: string;
}

export class PollyRestClient extends REST {
	private readonly clientId: string;
	constructor(config: PollyRestClientConfig) {
		const { options, token, clientId } = config;
		super(options);
		this.clientId = clientId;
		this.setToken(token);
	}

	public async removeAllSlashCommands() {
		return this.put(Routes.applicationCommands(this.clientId), { body: [] })
			.then(() =>
				console.log('Successfully deleted all application commands.')
			)
			.catch(console.error);
	}

	public async addAllSlashCommands(
		body: RESTPostAPIApplicationCommandsJSONBody[]
	) {
		return this.put(Routes.applicationCommands(this.clientId), {
			body: body,
		})
			.then(() =>
				console.log('Successfully registered application commands.')
			)
			.catch(console.error);
	}
}
