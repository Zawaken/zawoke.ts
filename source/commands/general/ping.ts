import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping', 'p'],
            category: 'general',
            description:
            {
                content: 'Replies with "Pong!"',
                usage: ''
            }
        });
    }
    public async exec(message: Message): Promise<Message | void> {
        return message.reply('Pong!');
    }
}