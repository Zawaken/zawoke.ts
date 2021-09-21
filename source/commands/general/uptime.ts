import { Command } from "discord-akairo";
import { Message, Client } from "discord.js";

export default class UptimeCommand extends Command {
    constructor() {
        super('uptime', {
            aliases: ['uptime'],
            category: 'general',
            description: 
                {
                    content: `Shows the uptime of the bot.`,
                    usage: '[command]'
                }
        });
    }
    public async exec(msg: Message): Promise<Message | void> {
        var uptime = new Date(this.client.uptime);
        const days = Math.floor(this.client.uptime / (60 * 1000 * 60 * 24));
        return msg.channel.send(
        `I've been up for ` + 
        `${days} days, ` +
        `${uptime.getHours() -1} hours, ` +
        `${uptime.getMinutes()} minutes and ` +
        `${uptime.getSeconds()} seconds.`)
    }
}