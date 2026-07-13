import type { ChatInputCommandInteraction, Client, Collection, SharedNameAndDescription, SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js'

export interface CommandInfo {
  name: SharedNameAndDescription['name']
  description: SharedNameAndDescription['description']
}
export interface Command {
  data: SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder
  execute: (interaction: ChatInputCommandInteraction, client: Client) => Promise<void>
}

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>
  }
}
