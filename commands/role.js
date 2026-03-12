/**
 * !role <@user> <role name>
 * Assigns the specified role to the mentioned user.
 * Role name can be multi-word (e.g. !role @User Guild Master)
 */
async function handleRole(message, args) {
  const targetUser = message.mentions.members.first();

  if (!targetUser) {
    return message.reply('❌ Please mention a user. Usage: `!role @user <role name>`');
  }

  const roleName = args.slice(1).join(' '); // everything after the mention

  if (!roleName) {
    return message.reply('❌ Please provide a role name. Usage: `!role @user <role name>`');
  }

  // Find role by name (case-insensitive)
  const role = message.guild.roles.cache.find(
    (r) => r.name.toLowerCase() === roleName.toLowerCase()
  );

  if (!role) {
    return message.reply(`❌ Role **${roleName}** not found in this server.`);
  }

  // Check bot has permission to assign this role (role hierarchy)
  const botMember = message.guild.members.me;
  if (role.position >= botMember.roles.highest.position) {
    return message.reply(`❌ I can't assign the **${role.name}** role — it's higher than or equal to my highest role.`);
  }

  try {
    await targetUser.roles.add(role);
    message.reply(`✅ Assigned role **${role.name}** to ${targetUser.user.tag}.`);
  } catch (err) {
    console.error('[role] Error:', err);
    message.reply('❌ Failed to assign role. Check my permissions.');
  }
}

module.exports = { handleRole };
