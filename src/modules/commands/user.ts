import type { ChatInputCommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('個人資訊')
    .addUserOption(option => option.setName('user').setDescription('目標使用者').setRequired(true)),

  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.guild) return

    const user = interaction.options.getUser('user', true)
    const user_cache = await interaction.guild.members.fetch(user)
    const joinTime = user_cache.joinedTimestamp
    await interaction.reply({ embeds: [{
      color: 0xFFFFFF,
      description: user.toString(),
      thumbnail: { url: user.displayAvatarURL() },
      fields: [
        { name: '用戶名 :', value: `${user.displayName}` },
        { name: `UID :`, value: `${user.id}` },
        { name: `加入DC時間 :`, value: `<t:${Math.trunc(user.createdTimestamp / 1000)}>` },
        { name: `加入伺服器時間 :`, value: joinTime ? `<t:${Math.trunc(joinTime / 1000)}>` : 'Unknown' },
      ],
    }] })
  },
}
