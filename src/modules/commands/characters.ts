import type { ChatInputCommandInteraction, Client } from 'discord.js'
import type { Command, CommandInfo } from '@/types/discord'
import { MessageFlags, SlashCommandBuilder } from 'discord.js'
import characters from '@/assets/avatars/characters'
import { isOwner } from '@/utils/general'

const commandInfo: CommandInfo = {
  name: 'characters',
  description: '切換人設(擁有者限定)',
}

export default {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description)
    .addSubcommand(sub =>
      sub.setName('list')
        .setDescription('列出可用人設'))
    .addSubcommand(sub =>
      sub.setName('set')
        .setDescription('設定人設')
        .addNumberOption(option =>
          option.setName('character')
            .setDescription('人設編號')
            .setRequired(true))),

  execute: async (interaction: ChatInputCommandInteraction, client: Client) => {
    if (!client.user) return
    if (!isOwner(interaction.user.id)) {
      await interaction.reply({ content: '此指令僅限擁有者使用', flags: MessageFlags.Ephemeral })
      return
    }

    const subCommand = interaction.options.getSubcommand()
    if (subCommand === 'list') {
      await interaction.reply({
        embeds: [{
          color: 0xFFFFFF,
          title: '可用人設',
          description: characters.list.map((v, i) => `${i + 1}. ${v}`).join('\n'),
        }],
      })
    } else if (subCommand === 'set') {
      const num = interaction.options.getNumber('character', true)
      try {
        client.user.setUsername(characters.characters[num].name)
        client.user.setAvatar(characters.characters[num].icon)
        await interaction.reply('已變更人設')
      } catch {
        await interaction.reply('數值錯誤')
      }
    }
  },
} satisfies Command
