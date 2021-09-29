import Zawoke from "./client/client";

const djsclient = new Zawoke({
    token: process.env.TOKEN,
});

djsclient.start();