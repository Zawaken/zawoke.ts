import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import fetch from 'cross-fetch';

export default class FunFactCommand extends Command {
    constructor() {
        super('fact',{
            aliases: ['funfact', 'fact'],
            description: [{
                content: 'Get a random fun fact.',
                usage: ''
            }]
        });
    }
    public async exec(msg: Message): Promise<Message | MessageEmbed | void> {
        const url = 'https://randomuselessfact.appspot.com/random.json?language=en';
        const data = await fetch(url).then(response => response.json());
        const embed = new MessageEmbed()
            .setTitle('Absolutely useless fact.')
            .setDescription(data['text']);

        return msg.channel.send(embed);
    }
}