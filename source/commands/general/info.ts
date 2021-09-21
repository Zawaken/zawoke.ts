import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class InfoCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info'],
            category: 'general',
            description:
            {
                content: 'Shows embed with info about a user. Defaults to message.author if no argument is supplied.',
                usage: '@mention'
            }
        });
    }
    public async exec(msg: Message): Promise<Message | void> {
        var member = msg.mentions.users.first();
        var user = msg.guild.members.resolve(member);

        if (!member && !user) {
            var member = msg.author;
            var user = msg.guild.members.resolve(msg.author);
        }

        const embed= new MessageEmbed().setTitle(`${user.displayName}#${member.discriminator}`)
            .setColor('0x600080')
            .setFooter(Date())
            .addField('id:', member.id, true)
            .addField('nick:', user.nickname, true)
            .addField('created at:', member.createdAt, true)
            .addField('Joined at:', user.joinedAt, true)
            .addField('bot?', member.bot, true)
            .addField('avatar url:', member.avatarURL(), true);
        if (!member.avatarURL()) {
            embed.setThumbnail('https://cdn.discordapp.com/embed/avatars/1.png')
        }else{
            embed.setThumbnail(`${member.avatarURL()}`)
        }
        return msg.channel.send(embed)
    }
}