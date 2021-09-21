import { 
    AkairoClient, 
    CommandHandler, 
    InhibitorHandler, 
    ListenerHandler 
} from 'discord-akairo';
import { Message } from 'discord.js';
import { join } from "path";

declare module 'discord-akairo' {
    interface AkairoClient {
        commandHandler: CommandHandler
        listenerHandler: ListenerHandler
        console: (content: string) => void
    }
}

interface BotOptions {
    token?: string,
    prefix?: string,
}

export default class Zawoke extends AkairoClient  {
    public config: BotOptions;

    public console: (content: string) => void

    public constructor(config: BotOptions) {
        super()
        this.config = config
        this.ownerID = '85467784179351552'
    }

    // public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
    //    directory: join(__dirname, "..", "inhibitors"),
    // })

    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "listeners"),
    })

    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "commands"),
        prefix: ['a '],
        allowMention: true,
    })

    private async init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listenerHandler)
        // this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process,
        })
        // this.inhibitorHandler.loadAll()
        this.commandHandler.loadAll()
        this.listenerHandler.loadAll()
    }

    public async start(): Promise<string> {
        await this.init()
        return this.login(this.config.token);
    }
}

