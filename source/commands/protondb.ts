// import { Command } from "discord-akairo";
const { MessageEmbed } = require("discord.js");
import axios from 'axios';
import { SlashCommandBuilder } from "@discordjs/builders";
const protondbdata = require('../../proton.json');
var FuzzyMatch = require('fuzzy-matching');

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
        let protonapi = `https://www.protondb.com/api/v1/reports/summaries/`;

        function limit (string = '', limit = 0) {
            if (string.length > limit) {
                return string.substring(0, limit) + '...';
            } else {
                return string;
            }
        };
        //add protondbdata into array and sort/remove duplicates
        const protonnames = protondbdata.map(obj => obj.app.title);
        const protonsorted = protonnames.sort();
        const unique = protonsorted.filter(function(item, pos, ary){
            return !pos || item != ary[pos - 1];
        });
        // Fuzzy search
        var fm = new FuzzyMatch(unique);
        const fuzzy = fm.get(args.getString('game')).value.toString();

        console.log(fm.get(args.getString('game')));
        if (JSON.stringify(protondbdata).includes(fuzzy)) {
            const search = obj => obj.app.title === fuzzy
            const index = protondbdata.findIndex(search)
            var appId = protondbdata[index].app.steam.appId
        } else {
            return await interaction.reply('Game not found in protondb dump')
        }
        try{
            const pdbfetch = await axios.get(`${protonapi}${appId}.json`);
            const description = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us`).then(response => response.data[appId]);

            if (description.success) {
                let desc = description.data.short_description//.replace(/&quot;/g, '"')
                    ?? description.data.detailed_description
                    ?? description.data.about_the_game
                    ?? ''
                    .replace(/<br>/gm, '\n')
                    .replace(/<[^>]*>?/gm, '')
                    // .replace(/&quot;/g, '"')
                let desc_quot = desc.replace(/&quot;/g, '"')
                var about = limit(desc_quot, 300)
            }

            const embed = new MessageEmbed().setTitle(fuzzy)
                .setDescription(`${about}\n\n[ProtonDB link](https://www.protondb.com/app/${appId}) [[Contribute!](https://www.protondb.com/contribute?appId=${appId})]`)
                .addField('ProtonDB Overall Rating', `${pdbfetch['data']['tier']} (${pdbfetch['data']['total']} reports)`,true)
                .addField('Recent', `${pdbfetch['data']['trendingTier']}`, true)
                .addField('Highest', `${pdbfetch['data']['bestReportedTier']}`, true)
                .setImage(`https://steamcdn-a.akamaihd.net/steam/apps/${appId}/header.jpg`)
                .setURL(`https://store.steampowered.com/app/${appId}`)
                .setFooter(`App ID: ${appId}`);
            await interaction.reply({embeds: [embed]});
        } catch(error) {
            console.error(error);
        }
    }
}
