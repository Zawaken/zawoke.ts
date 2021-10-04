import {client} from "./client";
require('dotenv').config();

const djsclient: client = new client({
    token: process.env.TOKEN,
});

djsclient.start();
