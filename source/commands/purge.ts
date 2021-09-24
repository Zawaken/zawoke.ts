import { Message } from "discord.js";

// export default class PurgeCommand extends Command {
//     constructor() {
//         super('purge', {
//             aliases: ['purge', 'delmsg'],
//             ownerOnly: true,
//             clientPermissions: ['MANAGE_MESSAGES'],
//             userPermissions: ['MANAGE_MESSAGES'],
//             category: 'admin',
//             args: [
//                 {
//                     id: 'amount',
//                     type: 'integer',
//                 }
//             ],
//             description:
//             {
//                 content: 'Deletes specified amount of messages',
//                 usage: '<number> (must be between 1 and 100)'
//             }
//         });
//     }
//     public async exec(msg: Message, { amount }: { amount: number }): Promise<Message | void> {
//         if(amount < 1 || amount > 100) return msg.channel.send('You can only delete between'
//             + ' 1 and 100 messages.');

//         if (msg.channel.type === "text") {
//             msg.channel.bulkDelete(amount, true)
//             return msg.channel.send(`Deleted ${amount} messages.`)
//                 .then(msg => msg.delete({ timeout: 3000}))
//         } else {
//             return;
//         }
//     }
// }
import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Deletes specified amount of messages.'),
	async execute(interaction, msg: Message) {
        var amount = 2
        if(amount < 1 || amount > 100) return msg.channel.send('You can only delete between'
            + ' 1 and 100 messages.');

        console.log(interaction.member)
        if (msg.channel.type === "GUILD_TEXT") {
            msg.channel.bulkDelete(amount, true)
            return msg.channel.send(`Deleted ${amount} messages.`)
                .then(msg => msg.delete())
        } else {
            return;
        }
	},
};