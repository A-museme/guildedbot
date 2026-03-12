/**
 * !help
 * Displays a list of all available bot commands.
 */
async function handleHelp(message) {
    const helpText = [
      '📖 **Guilded Bot Commands**',
      '',
      '**Moderation**',
      '`!clear <number>` — Deletes up to 100 messages from the current channel.',
      '`!clean` — Deletes all non-embed messages in the channel (preserves Raid Helper posts, etc.).',
      '`!role @user <role name>` — Assigns the named role to the mentioned user.',
      '',
      '**Player Lookup**',
      '`!armory <name>` — Posts a link to the player\'s TBC Anniversary Classic Armory profile.',
      '`!logs <name>` — Posts a link to the player\'s Warcraft Logs profile.',
      '',
      '`!help` — Shows this message.',
    ].join('\n');
  
    const reply = await message.channel.send(helpText);
  
    // Auto-delete the original command message to keep chat clean
    message.delete().catch(() => {});
  
    // Auto-delete the help message after 30 seconds
    setTimeout(() => reply.delete().catch(() => {}), 30000);
  }
  
  module.exports = { handleHelp };