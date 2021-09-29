// import { Client, Collection, Intents, } from 'discord.js';
const { Client, Collection, Intents } = require('discord.js');
import path from 'path';
import fs from 'fs';
require('dotenv').config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

const eventFiles = fs.readdirSync(path.resolve(__dirname, 'listeners')).filter(file => file.endsWith('.ts'));

for (const file of eventFiles) {
  const event = require(path.resolve(__dirname, 'listeners', file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.commands = new Collection();
const commandFiles = fs.readdirSync(path.resolve(__dirname, 'commands')).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
    //const command = require(`./commands/${file}`);
    const command = require(path.resolve(__dirname, 'commands', file));
    client.commands.set(command.data.name, command);
};

client.login(process.env.TOKEN);
export default client;
