import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9'
import { readdirSync } from 'fs';
require('dotenv').config();

const commands = []

const GUILDIDS: string[] = process.env.GUILDIDS.split(',');

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
const commandFiles = readdirSync('./source/commands').filter(file => file.endsWith('.ts'));
for (const file of commandFiles) {
	const command = require(`./source/commands/${file}`)
	commands.push(command.data.toJSON());
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