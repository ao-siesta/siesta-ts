// 先导入需要用到的Discord.js类型，确保TS能识别原有模块
import type { ChatInputCommandInteraction, Client, Collection, SlashCommandBuilder } from 'discord.js'

// 先定义你的Command类型（根据自己的命令结构调整）
export interface Command {
  data: SlashCommandBuilder
  execute: (interaction: ChatInputCommandInteraction, client: Client) => Promise<void>
}

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>
  }
}
