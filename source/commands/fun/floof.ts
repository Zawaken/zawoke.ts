const { SlashCommandBuilder } = require('@discordjs/builders');
import axios from 'axios';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('floof')
    .setDescription('Get a random floof from https://floof.runarsf.dev.')
//    .addStringOption(option => {
//      axios.get('https://floof.runarsf.dev/api/tags').then(res => {
//        option = option.setName('tag')
//        .setDescription('The floof tag.')
//          .setRequired(false)
//
//        res.data.forEach(floof => {
//          option = option.addChoice(floof, floof);
//        })
//      })
//
//
//      return option;
//    }), //.toJSON(),
    ,
  async execute(interaction) {
    const tag_option = interaction.options.getString('tag');
    const tag = tag_option ? `&tag=${tag_option}` : '';

    try {
      const res = await axios.get(`https://floof.runarsf.dev/api/random?type=json${tag}`);
      await interaction.reply(res.data.url);
    } catch (error) {
      console.error(error);
    }
  },
};
