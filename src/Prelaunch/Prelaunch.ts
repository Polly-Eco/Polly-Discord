import path from 'path';
import fs from 'fs/promises';
import { Command, CommandExecutor } from '../shared/interfaces';
import { Collection } from 'discord.js';
import { AppConfig } from '../helpers/getAppConfig';
import { PollyRestClient } from '../PollyRestClient/PollyRestClient';

export class Prelaunch {
    private commandsPath: string;
    private appConfig: AppConfig;
    private pollyRest: PollyRestClient;
    constructor(pathToCommands: string, appConfig: AppConfig, pollyRest: PollyRestClient) {
        this.commandsPath = pathToCommands;
        this.appConfig = appConfig;
        this.pollyRest = pollyRest;
    }

    public async getCommands (): Promise<Command[]> {
        const commandFiles =(await fs
            .readdir(this.commandsPath))
            .filter(file => file.endsWith('.ts'));
        const commandsPromises = commandFiles.map(
            (commandFile): Promise<{ command: Command }> => {
                const filePath = path.join(this.commandsPath, commandFile);
                return import(filePath);
            }
        );
        const commands = (await Promise.all(commandsPromises)).map(
            data => data.command
        );
        return commands;
    }

    public getCommandsCollection (commands: Command[]) {
        const commandsCollection = new Collection<string, CommandExecutor>();
        commands.forEach(({ data, execute }) =>
            commandsCollection.set(data.name, execute)
        );
        return commandsCollection;
    }

    public async updateSlashCommands (commands: Command[]) {
        const body = commands.map(({ data }) => data.toJSON());
        const { isUpdateRequired } = this.appConfig;
        if (isUpdateRequired) {
            await this.pollyRest.removeAllSlashCommands();
            await this.pollyRest.addAllSlashCommands(body);
        }
    }
}