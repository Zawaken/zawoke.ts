import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from 'cross-fetch';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('btc')
		.setDescription('Shows the current price of BTC in USD dollars of usa'),
	async execute(interaction) {
		let BITCOIN_PRICE_URL = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';
        const data = await fetch(BITCOIN_PRICE_URL).then(response => response.json());
        let PRICE_IN_USD = data['bpi']['USD']['rate'];
        await interaction.reply(`\`\`\`Bitcoin\'s current value is $${PRICE_IN_USD}\`\`\``);
	},
};