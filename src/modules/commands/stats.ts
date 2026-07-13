import type { ChatInputCommandInteraction } from 'discord.js'
import type { Command, CommandInfo } from '@/types/discord'
import { SlashCommandBuilder } from 'discord.js'
import { version } from 'package.json'
import { oid } from '@/config.json'

const commandInfo: CommandInfo = {
  name: 'stats',
  description: '確認機器人的狀態',
}

export default {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description),

  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply({ embeds: [{
      color: 0xFFFFFF,
      ...interaction.client.user.avatarURL() ? { thumbnail: { url: interaction.client.user.avatarURL()! } } : {},
      fields: [
        { name: '用戶名 :', value: `${interaction.client.user.displayName}` },
        { name: `ID :`, value: `${interaction.client.user.id}` },
        { name: `建立時間 :`, value: `<t:${Math.trunc(interaction.client.user.createdTimestamp / 1000)}>` },
        { name: `擁有者 :`, value: `蒼アオ <@${oid}>` },
        { name: '版本', value: version },
      ],
    }] })
  },
} satisfies Command
