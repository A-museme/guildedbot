# 🛡️ Guilded — Discord Moderation Bot

A Node.js Discord bot for the **\<Guilded\>** WoW guild. Provides moderation commands gated behind the **Admin** role and a Warcraft Logs verification system.

---

## ⚙️ Setup

### 1. Prerequisites
- Node.js **v18+**
- A Discord bot application → [discord.com/developers](https://discord.com/developers/applications)
- A Warcraft Logs **v1 API key** → [warcraftlogs.com/profile](https://www.warcraftlogs.com/profile)

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env
```
Edit `.env` and fill in:

| Variable | Description |
|---|---|
| `DISCORD_TOKEN` | Your bot token from the Discord developer portal |
| `WCL_API_KEY` | Warcraft Logs v1 public API key |
| `WCL_GUILD_NAME` | Exact guild name on WCL (default: `Guilded`) |
| `WCL_GUILD_SERVER` | Your realm name (e.g. `Sulfuras`) |
| `WCL_GUILD_REGION` | `us`, `eu`, `kr`, or `tw` |

### 4. Discord Bot Permissions
When inviting the bot, ensure it has:
- `Read Messages / View Channels`
- `Send Messages`
- `Manage Messages` (for `!clear` and `!clean`)
- `Manage Roles` (for `!role` and `!verify`)

In the Developer Portal → Bot, enable these **Privileged Gateway Intents**:
- ✅ Server Members Intent
- ✅ Message Content Intent

### 5. Run
```bash
npm start
# or for development with auto-restart:
npm run dev
```

---

## 📋 Commands

All commands require the **Admin** role (or Discord Administrator permission).

| Command | Description |
|---|---|
| `!clear <number>` | Deletes the specified number of messages (1–100), including the command itself |
| `!role @user <role name>` | Assigns the named role to the mentioned user |
| `!clean` | Deletes all non-embed messages in the channel (preserves Raid Helper posts etc.) |
| `!verify @user <ingamename>` | Looks up the character on Warcraft Logs, checks guild membership, and assigns the **raider** role |

### Examples
```
!clear 10
!role @Arthas Guild Master
!clean
!verify @Arthas Arthasdk
```

---

## 📝 Notes

- **`!clear`** — Discord only allows bulk-deleting messages **younger than 14 days**. Older messages must be deleted individually (not supported by this bot to avoid rate limits).
- **`!clean`** — Preserves any message containing embeds (Raid Helper, bot announcements, etc.). Also limited to messages < 14 days old.
- **`!verify`** — Uses the WCL **v1 REST API** (no OAuth required, just an API key). The character must have at least one public log, and the guild roster must be visible on WCL.
- The **raider** role must already exist on your Discord server before `!verify` can assign it.
