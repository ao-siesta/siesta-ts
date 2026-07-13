import type { ChatInputCommandInteraction } from 'discord.js'
import type { Command, CommandInfo } from '@/types/discord'
import { SlashCommandBuilder } from 'discord.js'

const commandInfo: CommandInfo = {
  name: 'serverstats',
  description: '伺服器基本資訊',
}

export default {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description),

  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.guild) return

    await interaction.reply({ embeds: [{
      color: 0xFFFFFF,
      title: interaction.guild.name,
      ...interaction.guild.iconURL() ? { thumbnail: { url: interaction.guild.iconURL()! } } : {},
      fields: [
        { name: '伺服器人數 :', value: `${interaction.guild.memberCount}` },
        { name: `伺服器建立時間 :`, value: `<t:${Math.trunc(interaction.guild.createdTimestamp / 1000)}>` },
        { name: `伺服器擁有者 :`, value: `<@${interaction.guild.ownerId}>` },
      ],
      footer: { text: `伺服器ID : ${interaction.guild.id}` },
    }] })
  },
} satisfies Command
