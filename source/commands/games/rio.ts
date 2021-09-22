import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import fetch from 'cross-fetch';

export default class RioGearCommand extends Command {
    constructor() {
        super('rio', {
            aliases: ['rio'],
            description:
            {
                content: 'Get gear stats for wow character',
                usage: '[character name] [realm] [region(optional)]'
            },
            args: [
                {
                    id: 'cname',
                    type: 'string'
                }, {
                    id: 'realm',
                    type: 'string'
                }, {
                    id: 'region',
                    type: 'string'
                } 
            ]
        });
    }
    public async exec(msg: Message, { realm, cname, region }: {realm: string, cname: string, region: string}): Promise<Message | MessageEmbed | void> {
        if (!region) var region = 'eu';
        let RIO_URL = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${cname}&fields=gear`;
        const data = await fetch(RIO_URL).then(response => response.json());

        try { data['gear']['item_level_equipped'] } catch { return msg.channel.send(`\`\`\`${cname}-${realm}-${region} is not a valid character name, ` +
            `please input a valid realm and name combination \n` +
            `Command example: \n${this.client.commandHandler.prefix}rio <character name> <realm> <region(optional)>\`\`\``)};


        const embed= new MessageEmbed().setTitle(`${data['name']}`)
            .setThumbnail(`${data['thumbnail_url']}`)
            .addField('Faction:', data['faction'])
            .addField('Race:', data['race'])
            .addField('Class:', data['class'])
            .addField('Ilvl:', data['gear']['item_level_equipped'])
            .setDescription(`[${data['profile_url']}](${data['profile_url']})`)
            .addField('Achievement points:', `${data['achievement_points']}`)
            if (data['faction'] === 'horde') 
            { embed.setColor('0x8C1616')}
            else { embed.setColor('0x004a93')};

        return msg.channel.send(embed);
    }
}