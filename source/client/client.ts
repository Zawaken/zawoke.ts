// import { Client, Collection, Intents, } from 'discord.js';
const { Client, Collection, Intents } = require('discord.js');
import path from 'path';
import fs from 'fs';
import { ClientUser } from 'discord.js';
require('dotenv').config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

const eventFiles = fs.readdirSync(path.resolve(__dirname, '..', 'listeners')).filter(file => file.endsWith('.ts'));

for (const file of eventFiles) {
  const event = require(path.resolve(__dirname, '..', 'listeners', file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.commands = new Collection();
const commandFiles = fs.readdirSync(path.resolve(__dirname, '..', 'commands')).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    client.commands.set(command.data.name, command);
}; 


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command :/', ephemeral: true})
    }
})

client.login(process.env.TOKEN);
export default client;

// const client = new Client({ intents: [Intents.FLAGS.GUILDS]})
// 
// client.once('ready', () => {
//     console.log('ready');
// });
// 
// client.commands = new Collection();
// 
// export default client;

//interface BotOptions {
//    token?: string,
//    prefix?: string,
//}



// export default class client extends Client  {
//     public config: BotOptions;
// 
//     public console: (content: string) => void
// 
//     public constructor(config: BotOptions) {
//         super( { intents: [Intents.FLAGS.GUILDS]} )
//         this.config = config
//     }
//     commands = new Collection();
//     public commandFiles = fs.readdirSync('/home/zawaken/git/zawoke.ts/source/commands').filter(file => file.endsWith('.ts'));
// 
//     for (const file of commandFiles) {
//         let command = require (`./commands/${file}`);
//         this.commands.set(command.data.name, command);
//     }
//     // once(event: 'ready', () => {
//     //     console.log('ready');
//     // });
// 
//     public async start(): Promise<string> {
//         return this.login(this.config.token);
//     }
// }
// for (const file of commandFiles) {
//         let command = require (`./commands/${file}`);
//         this.commands.set(command.data.name, command);
// }