/**
 * !clean
 * Deletes all messages in the channel that are NOT embeds.
 * Preserves embed messages (e.g. Raid Helper posts, bot announcements).
 * Processes in batches of 100 due to Discord API limits.
 * Only works on messages < 14 days old (Discord bulk delete limitation).
 */
async function handleClean(message) {
  const channel = message.channel;
  let deletedTotal = 0;

  const status = await channel.send('🧹 Cleaning channel, please wait...');

  try {
    let fetched;
    do {
      // Fetch up to 100 messages
      fetched = await channel.messages.fetch({ limit: 100 });

      // Filter: keep only non-embed messages (and skip the status message)
      const toDelete = fetched.filter((msg) => {
        if (msg.id === status.id) return false; // don't delete our own status msg yet
        const hasEmbed = msg.embeds.length > 0;
        return !hasEmbed; // delete messages WITHOUT embeds
      });

      if (toDelete.size === 0) break;

      const deleted = await channel.bulkDelete(toDelete, true); // filter > 14 days
      deletedTotal += deleted.size;

      // If we got fewer deletable messages than fetched, we're done
      if (deleted.size === 0) break;

    } while (fetched.size >= 2);

    await status.edit(`✅ Clean complete. Deleted **${deletedTotal}** message(s). Embed messages were preserved.`);
    setTimeout(() => status.delete().catch(() => {}), 6000);

  } catch (err) {
    console.error('[clean] Error:', err);
    status.edit('❌ An error occurred during cleaning. Some messages may not have been deleted.').catch(() => {});
  }
}

module.exports = { handleClean };
