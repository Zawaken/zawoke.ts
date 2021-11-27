import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9'
import { readdirSync } from 'fs';
import path from 'path';
require('dotenv').config();
import fs from 'fs';

const commands = []

const GUILDIDS: string[] = process.env.GUILDIDS.split(',');

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
const commandFiles = []
fs.readdirSync(path.resolve(__dirname, 'commands',), {withFileTypes: true}).forEach(fileorfolder => {
    if(fileorfolder.isDirectory()) {
        fs.readdirSync(path.resolve(__dirname, 'commands', fileorfolder.name), {withFileTypes: true})
            .filter(file => file.isFile())
            .filter(file => file.name.endsWith('.ts'))
            .forEach(file => {
                commandFiles.push(path.resolve(__dirname, 'commands', fileorfolder.name, file.name))
            });

    } else if (fileorfolder.isFile() && fileorfolder.name.endsWith('.ts')) {
        commandFiles.push(path.resolve(__dirname, 'commands', fileorfolder.name));
    }
})

for (const file of commandFiles) {
    const command = require(path.resolve(__dirname, 'commands', file))
    console.log(`found ${file}`)
    commands.push(command.data.toJSON())
}

for (const GuildID of GUILDIDS) {
	(async () => {
		try {
			await rest.put(
				Routes.applicationGuildCommands(process.env.CLIENTID, GuildID),
				{ body: commands },
			);
			//await rest.put(
			//	Routes.applicationCommands(process.env.CLIENTID),
			//	{ body: commands },
			//);

			console.log('Successfully registered application commands.');
		} catch (error) {
			console.error(error);
		}
	})();
}
