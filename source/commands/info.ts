import { SlashCommandBuilder } from "@discordjs/builders";
const { GuildMember, MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Shows embed with info about a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('the user you want to show info for'), 
            ),
	async execute(interaction, client) {
        // var member = Message.mentions.users.first();
        // var user = Message.guild.members.resolve(member);

        // if (!member && !user) {
        //     var member = Message.author;
        //     var user = Message.guild.members.resolve(Message.author);
        // }
        const d = new Date();
        const footer = [d.getDate(),
                d.getMonth() +1,
                d.getFullYear()].join('-')+' '+
                [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');
        const user = interaction.options.getUser('user') || interaction.user;

        console.log(user.joinedAt)
        //console.log(.guild.members.fetch(user.id).joinedAt)
        console.log(user)
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
	},
};