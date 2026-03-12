/**
 * !armory <name>
 * Posts a Classic Armory link for the given character name on Nightslayer (TBC Anniversary / US).
 * If no name is provided, the command message is deleted after a short warning.
 */
async function handleArmory(message, args) {
    const name = args[0];
  
    if (!name) {
      const warn = await message.reply('❌ Please provide a character name. Usage: `!armory <name>`');
      setTimeout(() => {
        warn.delete().catch(() => {});
        message.delete().catch(() => {});
      }, 5000);
      return;
    }
  
    const url = `https://classic-armory.org/character/us/tbc-anniversary/nightslayer/${encodeURIComponent(name)}`;
    await message.channel.send(`🛡️ **${name}** on Classic Armory:\n${url}`);
    message.delete().catch(() => {});
  }
  
  module.exports = { handleArmory };