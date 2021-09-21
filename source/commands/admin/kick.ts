import { Command } from "discord-akairo";
import { GuildMember, Message, Snowflake, User } from "discord.js";

export default class KickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
            ownerOnly: true,
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            category: 'admin',
            description:
            {
                content: 'Kick a member from the server.',
                usage: '@mention'
            }
        });
    }
    public async exec(msg: Message, args: { member: GuildMember }): Promise<GuildMember | User | Snowflake | Message | void> {
        const user = msg.mentions.users.first();
        if (user) {
            const member = msg.guild.members.resolve(user);
            if (member){
                member.kick();
                return msg.channel.send(`Kicked ${user}`);
            }
        }
    }
}