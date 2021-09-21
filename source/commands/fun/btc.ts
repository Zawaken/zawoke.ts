import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { get, request } from 'https';
import fetch from 'cross-fetch';

export default class BtcPriceCommand extends Command {
    constructor() {
        super('btc', {
            aliases: ['btc', 'bitcoin'],
            category: 'fun',
            description: 
            {
                content: 'Shows the current price of bitcoin in usd dollars of usa',
                usage: ''
            }
        });
    }
    public async exec(msg: Message): Promise<Message | void> {
        let BITCOIN_PRICE_URL = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';
        const data = await fetch(BITCOIN_PRICE_URL).then(response => response.json());
        let PRICE_IN_USD = data['bpi']['USD']['rate'];
        return msg.channel.send(`\`\`\`Bitcoin\'s current value is $${PRICE_IN_USD}\`\`\``);
    }
}