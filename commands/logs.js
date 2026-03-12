/**
 * !logs <n>
 * Posts a Warcraft Logs link for the given character name on Nightslayer (US).
 * If no name is provided, the command message is deleted after a short warning.
 */
async function handleLogs(message, args) {
    const name = args[0];
  
    if (!name) {
      const warn = await message.reply('❌ Please provide a character name. Usage: `!logs <n>`');
      setTimeout(() => {
        warn.delete().catch(() => {});
        message.delete().catch(() => {});
      }, 5000);
      return;
    }
  
    const url = `https://fresh.warcraftlogs.com/character/us/nightslayer/${encodeURIComponent(name)}`;
    await message.channel.send(`📊 **${name}** on Warcraft Logs:\n${url}`);
    message.delete().catch(() => {});
  }
  
  module.exports = { handleLogs };