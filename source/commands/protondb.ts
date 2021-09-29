// import { Command } from "discord-akairo";
const { MessageEmbed } = require("discord.js");
import axios from 'axios';
import { SlashCommandBuilder } from "@discordjs/builders";
const protondbdata = require('../../proton.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('proton')
		.setDescription('Get ProtonDB rating for a game.')
        .addStringOption(option =>
            option.setName('game')
            .setRequired(true)
            .setDescription('AppID or Game name')
        ),
	async execute(interaction) {
        const args = interaction.options
        if (args.getString('game')) {};

        const searchtext = args.getString('game')
        // Setting the URLs
        let protonapi = `https://www.protondb.com/api/v1/reports/summaries/`;
        let google = 'https://www.google.com/search?safe=off&q='
        //parse file on disk
        //for (let i = 0; i < JSON.stringify(protondbdata).length; i++) {
        ////if (JSON.stringify(protondbdata).includes(args.getString('game'))) {
        //if (protondbdata[i].app.title === args.getString('game')) {
        //    console.log(protondbdata[i].app.steam.appId)
        //}
        //else {
        //    //
        //}}

        if (JSON.stringify(protondbdata).includes(searchtext)) {
            const search = obj => obj.app.title === searchtext
            const index = protondbdata.findIndex(search)
            var appId = protondbdata[index].app.steam.appId
        } else {

        };
        const pdbfetch = await axios.get(`${protonapi}${appId}.json`)

        //embed
        const embed = new MessageEmbed().setTitle(args.getString('game'))
            .setDescription(`test\n> [ProtonDB link](https://www.protondb.com/app/${appId}) [[Contribute!](https://www.protondb.com/contribute?appId=${appId})]`)
            .addField('ProtonDB Overall Rating', `${pdbfetch['data']['tier']} (${pdbfetch['data']['total']} reports)`,true)
            .addField('Recent', `${pdbfetch['data']['trendingTier']}`, true)
            .addField('Highest', `${pdbfetch['data']['bestReportedTier']}`, true)
            .setImage(`https://steamcdn-a.akamaihd.net/steam/apps/${appId}/header.jpg`)
            .setURL(`https://store.steampowered.com/app/${appId}`)
            .setFooter(`App ID: ${appId}`)
        await interaction.reply({embeds: [embed]})

        // console.log(data)
        // console.log(soup)


        // Try/catch to check if the character is valid/shows up on Raider.io

        // Creating embed to send to discord
//        const embed= new MessageEmbed().setTitle(`${data['name']}`)
//             .setThumbnail(`${data['thumbnail_url']}`)
//             .addField('Faction:', `${data['faction']}`)
//             .addField('Realm', `${data['realm']}`)
//             .addField('Race:', `${data['race']}`)
//             .addField('Class:', `${data['class']}`)
//             .addField('Spec:', `${data['active_spec_name']}`)
//             .addField('Ilvl:', `${data['gear']['item_level_equipped']}`)
//             .setDescription(`[${data['profile_url']}](${data['profile_url']})`)
//             .addField('Achievement points:', `${data['achievement_points']}`);
//             if (data['faction'] === 'horde')
//             { embed.setColor('0x8C1616')}
//             else { embed.setColor('0x004a93')};
//        await interaction.reply({ embeds: [embed] });
    }
}
