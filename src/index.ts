import 'dotenv/config';
import { GatewayIntentBits } from 'discord.js';
import { Handler } from './Handler/Handler';
import { PollyClientConfig, PollyClient } from './PollyClient/PollyClient';
import path from 'path';
import { PATH_TO_COMMANDS } from './shared/constants';
import { getAppConfig } from './helpers/getAppConfig';
import { Prelaunch } from './Prelaunch/Prelaunch';

(async () => {
	const appConfig = await getAppConfig();

	const prelaunch = new Prelaunch(
		path.join(__dirname, PATH_TO_COMMANDS),
		appConfig
	);
	const commands = await prelaunch.getCommands();
	const commandsCollection = prelaunch.getCommandsCollection(commands);
	await prelaunch.updateSlashCommands(commands);

	const handler = new Handler(commandsCollection);

	const config: PollyClientConfig = {
		options: {
			intents: [GatewayIntentBits.Guilds],
		},
		appConfig,
		handler,
	};
	const client = new PollyClient(config);
	client.start();
})();
