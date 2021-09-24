//import { Command } from 'discord-akairo';
//import { Message } from 'discord.js';
//
//export default class RollCommand extends Command {
//    constructor() {
//        super('roll', {
//            aliases: ['roll'],
//            args: [{
//                id: 'num1',
//                type: 'integer'
//            }, {
//                id: 'num2',
//                type: 'integer'
//            }],
//            category: 'fun',
//            description:
//            {
//                content: 'Rolls a random number between 2 numbers (1 and 100 by default)',
//                usage: '<number1> <number2>'
//            }
//        });
//    }
//    public async exec(msg: Message, { num1,num2 }: { num1: number, num2: number }): Promise<Message | void> {
//        if (!num1) var num1 = 1
//        if (!num2) var num2 = 100
//        let roll = Math.floor(Math.random() * num2) +num1;
//
//        return msg.channel.send(`${msg.author.tag} rolls ${roll}`)
//    }
//}
import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls a random number between 2 numbers.')
        .addNumberOption(option =>
            option.setName('min')
                .setDescription('First integer'), 
            )
        .addNumberOption(option =>
            option.setName('max')
                .setDescription('Second integer')
            ),
	async execute(interaction) {
        const args = interaction.options;
        console.log(args);
        console.log(num1);
        console.log(num2);
        if (!args.get('min')) {console.log('it work')} else { console.log('it not work')}
        if (!args.get('min')) { var num1 = 1 } else { var num1: number = args.get('min').value};
        if (!args.get('max')) { var num2 = 100 } else { var num2: number = args.get('max').value};
        if (num1 > num2) { return interaction.reply(`min is more than max \`min: ${num1}\` \`max: ${num2}\``)}
        let roll = Math.floor(Math.random() * (num2-num1+1))+num1;
        console.log(roll)

        return interaction.reply(`${interaction.user.tag} rolls ${roll}`);
	},
};