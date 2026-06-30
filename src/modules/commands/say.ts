import type { ChatInputCommandInteraction } from 'discord.js'
import { MessageFlags, SlashCommandBuilder } from 'discord.js'
import { isOwner, quoteString } from '@/utils/general'

export default {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('洗版指令(擁有者限定)')
    .addStringOption(option => option.setName('message').setDescription('message').setRequired(true))
    .addIntegerOption(option => option.setName('times').setDescription('times').setRequired(false)),

  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.channel?.isSendable()) return
    if (isOwner(interaction.user.id)) {
      await interaction.reply({ content: '此指令僅限擁有者使用', flags: MessageFlags.Ephemeral })
      return
    }

    const message = interaction.options.getString('message', true)
    const times = interaction.options.getInteger('times')

    if (!times) {
      await interaction.reply({ content: `${quoteString(message)}`, flags: MessageFlags.Ephemeral })
      await interaction.channel.send(message)
    } else {
      await interaction.reply({ content: `重複 ${quoteString(message)} ${times}次`, flags: MessageFlags.Ephemeral })
      for (let i = 0; i < times; i++) {
        await interaction.channel.send(message)
      }
    }
  },
}
