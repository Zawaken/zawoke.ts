// import { Command } from "discord-akairo";
const { MessageEmbed } = require("discord.js");
import fetch from 'cross-fetch';
import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rio')
		.setDescription('Get gear stats for wow character.')
        .addStringOption(option =>
            option.setName('name')
            .setRequired(true)
            .setDescription('Character Name')
        )
        .addStringOption(option =>
            option.setName('realm')
            .setRequired(true)
            .setDescription('WoW realm for your character')
        )
        .addStringOption(option =>
            option.setName('region')
            .setRequired(false)
            .setDescription('The region your character is in \'eu\', \'na\' etc. Should default to EU if no option is specified')
        ),
	async execute(interaction) {
        const args = interaction.options
        if (!args.getString('region')) { var region = 'eu'}
        else { var region: string = args.getString('region')}

        // Setting the URL and fetching a json response from the Raider.io API
        let RIO_URL = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${args.getString('realm')}&name=${args.getString('name')}&fields=gear`
        const data = await fetch(RIO_URL).then(response => response.json());

        // Try/catch to check if the character is valid/shows up on Raider.io
        try { data['gear']['item_level_equipped'] } catch { return interaction.reply(`\`\`\`${args.getString('name')}-${args.getString('realm')}-${region} is not a valid character name, ` +
            `or doesn't show up on Raider.io, please input a valid realm and name combination \n` +
            `Command example: \n/rio <character name> <realm> <region(optional)>\`\`\``)};

        // Creating embed to send to discord
        const embed= new MessageEmbed().setTitle(`${data['name']}`)
             .setThumbnail(`${data['thumbnail_url']}`)
             .addField('Faction:', `${data['faction']}`)
             .addField('Realm', `${data['realm']}`)
             .addField('Race:', `${data['race']}`)
             .addField('Class:', `${data['class']}`)
             .addField('Spec:', `${data['active_spec_name']}`)
             .addField('Ilvl:', `${data['gear']['item_level_equipped']}`)
             .setDescription(`[${data['profile_url']}](${data['profile_url']})`)
             .addField('Achievement points:', `${data['achievement_points']}`);
             if (data['faction'] === 'horde')
             { embed.setColor('0x8C1616')}
             else { embed.setColor('0x004a93')};
        await interaction.reply({ embeds: [embed] });

	},
};

