module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    const guilds = client.guilds.cache.map(guild => guild.name);
    console.info(`Logged in as:`);
    console.info(`${client.user.username} - ${client.user.id}`);
    console.info(`${client.user.tag} is currently running in ${guilds.length} guild(s):`);
    console.info(guilds.map(guild => ' - ' + guild).join('\n'));
    client.user.setPresence({
      activities: [{
        name: 'anime',
        type: 'WATCHING'
      }],
      status: 'online'
    });
  },
};