import Zawoke from "./client/client";
require('custom-env').env();

const client: Zawoke = new Zawoke({
    token: process.env.TOKEN,
});

client.start();