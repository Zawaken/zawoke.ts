import { Listener } from "discord-akairo"

export default class ReadyListener extends Listener {
    public constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client",
        })
    }

    public async exec(): Promise<void> {
        const bot = this.client
        await bot.user.setActivity(
            'akairo in typescript',
            {
                type: "WATCHING",
            }
        );
        console.clear()
        console.log('-'.repeat(bot.user.id.length))
        console.log('Logged in as:');
        console.log(`${bot.user.username} - ${this.client.user.id}`)
        console.log(`${bot.user.username} is currently running in ${bot.guilds.cache.size} servers.`)
        console.log('-'.repeat(bot.user.id.length))
    }
}