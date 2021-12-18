// import { Client, Collection, Intents, } from 'discord.js';
const { Client, Collection, Intents } = require('discord.js');
import path from 'path';
import fs from 'fs';
import {join} from 'path';

interface Config {
    token?: string,
    intents?: typeof Intents,
}

const defaultConfig: Config = {
    intents: [Intents.FLAGS.GUILDS],
}

export class client extends Client {
    public constructor(config: Config) {
        //super({...defaultConfig});
        super({...defaultConfig});
        this.config = config
    }

    public async init(): Promise<void> {
        this.commands = new Collection();
        this.loadCommands();

        this.loadListeners();
    }

    private loadListeners(): void {
        const eventFiles = fs.readdirSync(path.resolve(__dirname, 'listeners')).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
          const event = require(path.resolve(__dirname, 'listeners', file));
          if (event.once) {
            this.once(event.name, (...args) => event.execute(...args));
          } else {
            this.on(event.name, (...args) => event.execute(...args));
          }
        }
    }

    private loadCommands(): void {
        const commandFiles = fs.readdirSync(path.resolve(__dirname, 'commands'))//.filter(file => file.endsWith('.ts'));

        for (const file of commandFiles) {
            fs.stat(path.resolve(__dirname, 'commands', file), (err,stats) => {
                if (err) throw err;
                if (stats.isDirectory()) {
                    let subdir = path.join(__dirname, 'commands', file)
                    fs.readdirSync(path.resolve(__dirname, 'commands', subdir), {withFileTypes: true})
                        .filter(file => file.isFile())
                        .filter(file => file.name.endsWith('.js'))
                        .forEach(command => {
                            const commands = require(path.resolve(__dirname, 'commands', subdir, command.name))
                            this.commands.set(commands.data.name, commands)
                        })
                } else if (stats.isFile()) {
                    const command = require(path.resolve(__dirname, 'commands', file));
                    this.commands.set(command.data.name, command);
                }
            })
        };
    }
    public async start(): Promise<string> {
        await this.init();

        return this.login(this.config.token);
    }
}
