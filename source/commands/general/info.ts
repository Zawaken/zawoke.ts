import { SlashCommandBuilder } from "@discordjs/builders";
const { GuildMember, MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Shows embed with info about a user or a server.')
        .addSubcommand(subcommand =>
            subcommand
            .setName('user')
            .setDescription('Info about a user/yourself.')
            .addUserOption(option => option.setName('user').setDescription('the user you want to show info for') )
                      )
        .addSubcommand(subcommand =>
            subcommand
            .setName('server')
            .setDescription('Info about the server.')
            ),
	async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            const d = new Date();
            const footer = [d.getDate(),
                    d.getMonth() +1,
                    d.getFullYear()].join('-')+' '+
                    [d.getHours(),
                    d.getMinutes(),
                    d.getSeconds()].join(':');
            const user = interaction.options.getUser('user') || interaction.user;

            const embed = new MessageEmbed().setTitle(`${user.tag}`)
                .setColor('0x600080')
                .setFooter(footer)
                .addField('id:', user.id,true)
                //.addField('nick:',GuildMember.nickname.toString(), true)
                .addField('created at:', `${user.createdAt.toISOString()}`, true)
                //.addField('Joined at:', user.joinedAt, true)
                .addField('bot?', user.bot.toString(), true)
                .addField('avatar url:', user.avatarURL(), true);
                embed.setThumbnail(`${user.avatarURL()}`);
            await interaction.reply({ embeds: [embed] });
        } else if (interaction.options.getSubcommand() === 'server') {
            await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)
        }
	},
};
