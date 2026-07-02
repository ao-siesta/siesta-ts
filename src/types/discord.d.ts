// 先导入需要用到的Discord.js类型，确保TS能识别原有模块
import type { ChatInputCommandInteraction, Client, Collection, SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js'

// 先定义你的Command类型（根据自己的命令结构调整）
export interface Command {
  data: SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder
  execute: (interaction: ChatInputCommandInteraction, client: Client) => Promise<void>
}

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>
  }
}
