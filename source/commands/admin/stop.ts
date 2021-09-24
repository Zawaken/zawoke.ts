import { Command } from 'discord-akairo';
import { Message, MessageReaction } from 'discord.js';

export default class StopCommand extends Command {
    constructor() {
        super('stop', {
            aliases: ['stop', 'die'],
            ownerOnly: true,
            category: 'admin',
            description:
            {
                content: 'Stop/kill the bot.',
                usage: ''
            }
        });
    }
    public async exec(msg: Message): Promise<Message | MessageReaction | void> {
        return msg.channel.send('Bye!')
            .then(msg => msg.react('👋'))
            .then(msg => console.log('Committing sudoku.'))
            .then(msg => this.client.destroy());
    }
}
import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('die')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};