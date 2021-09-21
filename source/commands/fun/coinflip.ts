import { Command } from 'discord-akairo';
import { Message, MessageReaction } from 'discord.js';

export default class CoinFlipCommand extends Command {
    constructor() {
        super('flip', {
            aliases: ['flip', 'cf'],
            category: 'fun',
            description:
            {
                content: 'Flips a coin and reacts to your message with result',
                usage: ''
            }
        });
    }
    public async exec(msg: Message): Promise<MessageReaction | void> {
        let flip = (Math.floor(Math.random() * 2) == 0);
        if(flip) {
            return msg.react('⚪');
        } else {
            return msg.react('⚫');
        }
    }
}