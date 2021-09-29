import { MessageEmbed } from "discord.js";
import fetch from 'cross-fetch';
import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('funfact')
		.setDescription('Get a random fun(useless) fact.'),
	async execute(interaction) {
        const url = 'https://randomuselessfact.appspot.com/random.json?language=en';
        const data = await fetch(url).then(response => response.json());
        const embed = new MessageEmbed()
            .setTitle('Absolutely useless fact.')
            .setDescription(data['text']);

        await interaction.reply({embeds: [embed]});
	},
};