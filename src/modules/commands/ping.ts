import type { ChatInputCommandInteraction, Client } from 'discord.js'
import type { Command, CommandInfo } from '@/types/discord'
import { SlashCommandBuilder } from 'discord.js'
import { CommandRegistry } from './registry'

const commandInfo: CommandInfo = {
  name: 'ping',
  description: '確認延遲',
}

CommandRegistry.set(commandInfo.name, {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description),

  execute: async (interaction: ChatInputCommandInteraction, client: Client) => {
    const sent = await interaction.reply({ content: 'Pinging...', withResponse: true })
    try {
      await interaction.editReply(`Roundtrip latency: ${sent.resource!.message!.createdTimestamp - interaction.createdTimestamp}ms\nWebsocket heartbeat: ${client.ws.ping}ms.`)
    } catch {
      await interaction.editReply(`Roundtrip latency: Calculating..Please try again later.\nWebsocket heartbeat: ${client.ws.ping}ms.`)
    }
  },
} satisfies Command)
