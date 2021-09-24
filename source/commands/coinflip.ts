import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('flip')
		.setDescription('Flip a coin.'),
	async execute(interaction) {
        let flip = (Math.floor(Math.random() * 2) == 0)
        if (flip) {
            await interaction.reply('Heads!')
        } else {
            await interaction.reply('Tails!')
        }
	},
};