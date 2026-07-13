import type { ChatInputCommandInteraction, Client } from 'discord.js'
import type { Command, CommandInfo } from '@/types/discord'
import { SlashCommandBuilder } from 'discord.js'

const commandInfo: CommandInfo = {
  name: 'ping',
  description: '確認延遲',
}

export default {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description),

  execute: async (interaction: ChatInputCommandInteraction, client: Client) => {
    const sent = await interaction.reply({ content: 'Pinging...' })
    interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms\nWebsocket heartbeat: ${client.ws.ping}ms.`)
  },
} satisfies Command
