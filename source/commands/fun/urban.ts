import { SlashCommandBuilder } from "@discordjs/builders";
import axios from 'axios';
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('urban')
		.setDescription('Search Urban Dictionary')
        .addStringOption(option =>
            option.setName('search')
            .setRequired(true)
            .setDescription('Search Term for urban dictionary.')
        ),
	async execute(interaction) {
        const arg = interaction.options.getString('search')
        const urban = await axios.get(`https://api.urbandictionary.com/v0/define?term=${arg}`).then(res => res.data['list'])
        try{
            var definition = urban[0]['definition']
        } catch {
            return interaction.reply(`\`\`\`\nCould not find a definition for "${arg}"\`\`\` `)
        }
        var example = urban[0]['example']
        const embed = new MessageEmbed().setTitle(arg)
            .addFields(
                {name: 'Definition:', value: `${definition}`},
                {name: 'Usage:', value: `${example}`}
            )
            .setURL(urban[0]['permalink'])
        await interaction.reply({embeds: [embed]})
	},
};

