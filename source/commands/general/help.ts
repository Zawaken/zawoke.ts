import { Argument, Command, PrefixSupplier } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'man'],
            description: {
                content: 'Displays a list of available commands.',
                usage: '[command]'
            },
            category: 'general',
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    id: 'command',
                    type: 'commandAlias'
                }
            ]
        });
    }
    public async exec(msg: Message, { command }: { command: Command}): Promise<Message | MessageEmbed | void> {
        if (!command) {
            const embed = new MessageEmbed()
                .setColor('0x600080')
                .addField('Commands', `A list of available commands.
                    For additional info on a command, type \`${this.client.commandHandler.prefix}help <command>\`
                `);

            this.client.commandHandler.categories.forEach((cat) => {
                if (cat.first()?.categoryID.toLowerCase() !== "flag") {
                    embed.fields.push({
                        name: `${cat.first()?.categoryID} (${cat.size})`,
                        value: cat.map((cmd) => `• ${cmd.aliases.join(' | ')}`).join('\n'),
                        inline: false,
                    })
                }
            })
            // for (const category of this.handler.categories.values()) {
            //     // embed.addField(`${category.id}`, `${category.filter((cmd): boolean => cmd.aliases.length > 0).map((cmd): string => `\`${cmd.aliases[0]}\``).join(' ')}`);
            //     embed.addField(`${category.id}`, `${category
            //         .filter((cmd): boolean => cmd.aliases.length > 0)
            //         .map((cmd): string => `\`${cmd.aliases[0]}\``)
            //         .join(' ')}`);
            // }

            msg.delete();
            return msg.channel.send(embed);
        }
        
        const embed = new MessageEmbed()
            .setColor('0x600080')
            .setTitle(`\`${this.client.commandHandler.prefix}${command.aliases[0]} ${command.description.usage ? command.description.usage : ''}\``)
            .addField('Descropt', `${command.description.content ? command.description.content : ''} ${command.description.ownerOnly ? '\n**[Owner Only]**': ''}`);
        
        if (command.aliases.length > 1) embed.addField('Aliases', `${command.aliases}`);
        msg.delete();
        return msg.channel.send(embed);
    }
}
