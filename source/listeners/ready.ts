module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    if (process.env.DOCKER_MODE = "True")
        var activity = "anime in container"
    else
        var activity = "anime"
    const guilds = client.guilds.cache.map(guild => guild.name);
    console.info(`Logged in as:`);
    console.info(`${client.user.username} - ${client.user.id}`);
    console.info(`${client.user.tag} is currently running in ${guilds.length} guild(s):`);
    console.info(guilds.map(guild => ' - ' + guild).join('\n'));
    client.user.setPresence({
      activities: [{
        name: activity,
        type: 'WATCHING'
      }],
      status: 'online'
    });
  },
};
