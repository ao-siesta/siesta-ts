import type { ChatInputCommandInteraction } from 'discord.js'
import type { Command, CommandInfo } from '@/types/discord'
import { MessageFlags, SlashCommandBuilder } from 'discord.js'
import ErrorMessage from '@/utils/ErrorMessage'
import { isOwner, quoteString } from '@/utils/general'
import commandRegistry from './CommandRegistry'

const commandInfo: CommandInfo = {
  name: 'say',
  description: '洗版指令(擁有者限定)',
}

commandRegistry.set(commandInfo.name, {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description)
    .addStringOption(option => option.setName('message').setDescription('message').setRequired(true))
    .addIntegerOption(option => option.setName('times').setDescription('times').setRequired(false)),

  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.channel?.isSendable()) return
    if (isOwner(interaction.user.id)) {
      await interaction.reply({ content: ErrorMessage.OwnerOnly, flags: MessageFlags.Ephemeral })
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
} satisfies Command)
