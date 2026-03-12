/**
 * !clear <x>
 * Deletes x messages from the current channel (including the command itself).
 * Discord bulk delete only supports up to 100 messages at a time,
 * and messages must be < 14 days old for bulk delete.
 */
async function handleClear(message, args) {
  const amount = parseInt(args[0]);

  if (isNaN(amount) || amount < 1 || amount > 100) {
    const warn = await message.reply('❌ Please provide a number between 1 and 100. Usage: `!clear <number>`');
    setTimeout(() => warn.delete().catch(() => {}), 5000);
    return;
  }

  // +1 to include the command message itself
  const toDelete = Math.min(amount + 1, 100);

  try {
    const deleted = await message.channel.bulkDelete(toDelete, true); // true = filter messages > 14 days
    const reply = await message.channel.send(
      `🗑️ Deleted **${deleted.size}** message(s).`
    );
    setTimeout(() => reply.delete().catch(() => {}), 4000);
  } catch (err) {
    console.error('[clear] Error:', err);
    message.channel.send('❌ Failed to delete messages. Messages older than 14 days cannot be bulk deleted.').catch(() => {});
  }
}

module.exports = { handleClear };
