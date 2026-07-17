import type { ChatInputCommandInteraction, Client } from 'discord.js'
import type { Command, CommandInfo } from '@/types/discord'
import { MessageFlags, SlashCommandBuilder } from 'discord.js'
import ErrorMessage from '@/utils/ErrorMessage'
import { isOwner, quoteString } from '@/utils/general'
import commandRegistry from './CommandRegistry'

const commandInfo: CommandInfo = {
  name: 'listservers',
  description: '列出機器人所在伺服器(擁有者限定)',
}

commandRegistry.set(commandInfo.name, {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description),

  execute: async (interaction: ChatInputCommandInteraction, client: Client) => {
    if (!isOwner(interaction.user.id)) {
      await interaction.reply({ content: ErrorMessage.OwnerOnly, flags: MessageFlags.Ephemeral })
      return
    }

    const guilds = await client.guilds.fetch()
    const output = guilds.map(({ name }, id) => `${quoteString(id)} ${quoteString(name)} `).join('\n')

    await interaction.reply({ embeds: [{
      color: 0xFFFFFF,
      title: '所在伺服器',
      description: output,
    }] })
  },
} satisfies Command)
