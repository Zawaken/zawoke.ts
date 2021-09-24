import { SlashCommandBuilder } from "@discordjs/builders";
import client from "../client/client";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription('Replies with the bot\'s current uptime'),
	async execute(interaction) {
		let uptime = new Date(client.uptime);
		let week = 0
		let days = Math.floor(client.uptime / (60 * 1000 * 60 * 24));
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