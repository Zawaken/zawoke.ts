module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'yes') {
            await interaction.update({content: 'You actually clicked it', ephemeral: false, components: []})
        }
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};

