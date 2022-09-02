import 'dotenv/config';
import { GatewayIntentBits } from 'discord.js';
import { Handler } from './Handler/Handler';
import { Config, PollyClient } from './PollyClient/PollyClient';
import path from 'path';
import { PollyRestClient } from './PollyRestClient/PollyRestClient';
import { PATH_TO_COMMANDS } from './shared/constants';
import { getAppConfig } from './helpers/getAppConfig';
import { Prelaunch } from './Prelaunch/Prelaunch';

(async () => {
	const appConfig = await getAppConfig();
	const { token, clientId } = appConfig;
	const prelaunch = new Prelaunch(
		path.join(__dirname, PATH_TO_COMMANDS),
		appConfig,
		new PollyRestClient({
			options: {
				version: '10',
			},
			token,
			clientId,
		})
	);
	const commands = await prelaunch.getCommands();
	const commandsCollection = prelaunch.getCommandsCollection(commands);
	await prelaunch.updateSlashCommands(commands);

	const handler = new Handler(commandsCollection);
	const config: Config = {
		options: {
			intents: [GatewayIntentBits.Guilds],
		},
		token,
		handler,
	};
	const client = new PollyClient(config);
	client.start();
})();
