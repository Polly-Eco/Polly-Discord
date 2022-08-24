// import { request } from 'undici';
import 'dotenv/config';
import {
	Client,
	GatewayIntentBits,
	SlashCommandBuilder,
	Routes,
	Collection,
	ChatInputCommandInteraction,
} from 'discord.js';
import { REST } from '@discordjs/rest';
import { Handler } from './Handler/Handler';
import { Config, PollyClient } from './PollyClient/PollyClient';
import fs from 'fs';
import path from 'path';
import { Command, CommandExecutor } from './shared/interfaces';

(async () => {
	const token = process.env.NONPROD_TOKEN ?? '';
	const clientId = process.env.CLIENT_ID ?? '';
	const commandsCollection = new Collection<string, CommandExecutor>();
	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter(file => file.endsWith('.ts'));
	const commandsPromises = commandFiles.map(
		(commandFile): Promise<{ command: Command }> => {
			const filePath = path.join(commandsPath, commandFile);
			return import(filePath);
		}
	);
	const commands = (await Promise.all(commandsPromises)).map(
		data => data.command
	);
	commands.forEach(({ data, execute }) =>
		commandsCollection.set(data.name, execute)
	);
	const body = commands.map(({ data }) => data.toJSON());
	console.log(body);
	// const commands = [
	// new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	// new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	// new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	// 	new SlashCommandBuilder()
	// 		.setName('coin')
	// 		.setDescription('Gives you head or tails')
	// 		.addStringOption(option =>
	// 			option
	// 				.setName('head')
	// 				.setDescription('set the head value if you desire')
	// 				.setRequired(false)
	// 		)
	// 		.addStringOption(option =>
	// 			option
	// 				.setName('tails')
	// 				.setDescription('set the tails value if you desire')
	// 				.setRequired(false)
	// 		),
	// ].map(command => command.toJSON());

	const rest = new REST({
		version: '10',
	}).setToken(token);

	// rest.put(Routes.applicationCommands(clientId), { body: body })
	// 	.then(() => console.log('Successfully registered application commands.'))
	// 	.catch(console.error);

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

// // Create a new client instance

// // When the client is ready, run this code (only once)

// Login to Discord with your client's token
