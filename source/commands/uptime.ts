import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription('Replies with the bot\'s current uptime'),
	async execute(interaction)  {
		let uptime = new Date(interaction.client.uptime);
		let days = Math.floor(interaction.client.uptime / (60 * 1000 * 60 * 24));
		let hours = uptime.getHours() -1;
		let minutes = uptime.getMinutes();
		let seconds = uptime.getSeconds();

		let message = '';
		if (days) {message += `${days} days, `};
		if (hours) {message += `${hours} hours, `};
		if (minutes) {message += `${minutes} minutes and `};
		message += `${seconds} seconds`;

		await interaction.reply(`I've been up for ${message}`);
	},
};
