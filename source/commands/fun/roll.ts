import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class RollCommand extends Command {
    constructor() {
        super('roll', {
            aliases: ['roll'],
            args: [{
                id: 'num1',
                type: 'integer'
            }, {
                id: 'num2',
                type: 'integer'
            }],
            category: 'fun',
            description:
            {
                content: 'Rolls between 2 random numbers (1 and 100 by default)',
                usage: '<number1> <number2>'
            }
        });
    }
    public async exec(msg: Message, { num1,num2 }: { num1: number, num2: number }): Promise<Message | void> {
        if (!num1) var num1 = 1
        if (!num2) var num2 = 100
        let roll = Math.floor(Math.random() * num2) +num1;

        return msg.channel.send(`${msg.author.tag} rolls ${roll}`)
    }
}