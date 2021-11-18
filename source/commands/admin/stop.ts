import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('die')
		.setDescription('Stops the Discord bot.'),
	async execute(interaction) {
        await interaction.reply('bye')
        await interaction.client.destroy()
	},
};
