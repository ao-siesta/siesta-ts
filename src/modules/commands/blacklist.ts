import type { ChatInputCommandInteraction, Client } from 'discord.js'
import { SlashCommandBuilder } from 'discord.js'
import { isOwner, logTime } from '@/utils/general'

export default {
  data: new SlashCommandBuilder()
    .setName('blacklist')
    .setDescription('將使用者從此機器人所有伺服器停權(擁有者限定)')
    .addStringOption(option =>
      option.setName('userid')
        .setDescription('使用者ID')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('原因')
        .setRequired(true)),

  execute: async (interaction: ChatInputCommandInteraction, client: Client) => {
    if (!isOwner(interaction.user.id)) {
      await interaction.reply({ content: '此指令僅限擁有者使用', ephemeral: true })
      return
    }
    const channel = interaction.channel
    if (!channel?.isSendable()) return

    const userId = interaction.options.getString('userid', true)
    const reason = interaction.options.getString('reason', true)
    await Promise.allSettled(client.guilds.cache.map((guild) => {
      return guild.bans.create(userId, { reason }).catch(() => {
        channel.send('asd')
      })
    }))
    await interaction.reply({ content: '已將成員從所有共同伺服器停權' })

    logTime()
    console.log(`-----------------------\nblacklisted ${userId}\n-----------------------`)
  },
}
