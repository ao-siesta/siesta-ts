import type { ChatInputCommandInteraction, Client } from 'discord.js'
import { ChannelType, MessageFlags, SlashCommandBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('產生邀請連結(擁有者限定)')
    .addSubcommand(sub =>
      sub.setName('bot')
        .setDescription('機器人邀請連結'))
    .addSubcommand(sub =>
      sub.setName('server')
        .setDescription('伺服器邀請連結')
        .addStringOption(option =>
          option.setName('serverid')
            .setDescription('伺服器ID')
            .setRequired(true))),

  execute: async (interaction: ChatInputCommandInteraction, client: Client) => {
    if (!isOwner(interaction.user.id)) {
      await interaction.reply({ content: '此指令僅限擁有者使用', flags: MessageFlags.Ephemeral })
      return
    }

    const subCommand = interaction.options.getSubcommand()
    if (subCommand === 'bot') {
      await interaction.reply({ embeds: [{
        color: 0xFFFFFF,
        title: '機器人邀請連結',
        description: 'https://discordapp.com/api/oauth2/authorize?client_id=843890891704893530&permissions=8&scope=bot%20applications.commands',
      }] })
    } else if (subCommand === 'server') {
      const serverId = interaction.options.getString('serverid', true)
      const server = client.guilds.cache.get(serverId)
      await server?.channels?.cache
        .filter(channel => channel.type === ChannelType.GuildText)
        .first()
        ?.createInvite({ maxAge: 43200, maxUses: 5 })
        .then(async (invite) => {
          await interaction.reply({ embeds: [{
            color: 0xFFFFFF,
            title: `前往 ${server.name}`,
            description: invite.url,
          }] })
        })
    }
  },
}
