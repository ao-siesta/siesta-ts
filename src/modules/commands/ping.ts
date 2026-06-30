import type { ChatInputCommandInteraction, Client } from 'discord.js'
import { SlashCommandBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('確認延遲'),

  execute: async (interaction: ChatInputCommandInteraction, client: Client) => {
    const sent = await interaction.reply({ content: 'Pinging...' })
    interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms\nWebsocket heartbeat: ${client.ws.ping}ms.`)
  },
}
