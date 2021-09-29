import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageButton } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Deletes specified amount of messages.')
		.addNumberOption(option =>
        	option.setName('amount')
			    .setRequired(true)
        		.setDescription('First integer'),
            ),
	async execute(interaction) {
	const amount = interaction.options.getNumber('amount')
        if(amount < 1 || amount > 100) return interaction.reply({ content: 'You can only delete between'
            + ' 1 and 100 messages.', ephemeral: true});
        const buttons = new MessageActionRow()
            .addComponents()
                new MessageButton()
                    .setCustomId('yes')
                    .setLabel('Yes')
                    .setStyle('DANGER')
                new MessageButton()
                    .setCustomId('no')
                    .setLabel('No!')
                    .setStyle('SECONDARY')
        if (interaction.channel.type === "GUILD_TEXT") {
            interaction.channel.bulkDelete(amount, true)
            return interaction.reply({content: `Deleted ${amount} messages.`, fetchReply: true})
                .then(message => { setTimeout(() => message.delete(), 2000 ) })
                .catch(error => { console.log(error) });
        } else {
            return;
        }
	},
};
