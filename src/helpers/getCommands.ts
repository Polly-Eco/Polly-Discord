import path from 'path';
import fs from 'fs/promises';
import { Command } from '../shared/interfaces';

export const getCommands = async (commandsPath: string): Promise<Command[]> => {
	const commandFiles = (await fs.readdir(commandsPath)).filter(file =>
		file.endsWith('.ts')
	);
	const commandsPromises = commandFiles.map(
		(commandFile): Promise<{ command: Command }> => {
			const filePath = path.join(commandsPath, commandFile);
			return import(filePath);
		}
	);
	const commands = (await Promise.all(commandsPromises)).map(
		data => data.command
	);
	return commands;
};
