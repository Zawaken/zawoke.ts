import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageButton, GuildMember, Permissions } from 'discord.js';
import {Sleep} from '../../utils/sleep'

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
        console.log(interaction.user.flags)
        // const member = new GuildMember(this.client, interaction.user, this.guild)
        // if (member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
        if (interaction.client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.user.id).permissions.has('MANAGE_MESSAGES')) {
            if(amount < 1 || amount > 100) return interaction.reply({ content: 'You can only delete between'
                + ' 1 and 100 messages.', ephemeral: true});
            const buttons = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('yes')
                        .setLabel('Yes')
                        .setStyle('DANGER'),
                    new MessageButton()
                        .setCustomId('no')
                        .setLabel('No!')
                        .setStyle('SECONDARY')
                )
            // await interaction.reply({content: 'test', ephemeral: true, components: [buttons]})
            if (interaction.channel.type === "GUILD_TEXT") {
                interaction.channel.bulkDelete(amount, true)
                await Sleep(1000)
                return interaction.reply({content: `Deleted ${amount} messages.`, fetchReply: true})
                    .then(message => { setTimeout(() => message.delete(), 2000 ) })
                    .catch(error => { console.log(error) });
            } else {
                return;
            }
	    } else {
            console.log(`${interaction.user.tag} does not have the "Permissions.FLAGS.MANAGE_MESSAGES" permission`)
            await interaction.reply(`You do not have permissions to remove messages in this server.`)
        }
    }
};
