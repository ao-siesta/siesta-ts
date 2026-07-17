import type { ChatInputCommandInteraction } from 'discord.js'
import { PermissionFlagsBits } from 'discord.js'
import config from '@/config.json'

export function quoteString(str?: string) {
  return `\`${str}\``
}

export function isAdmin(interaction: ChatInputCommandInteraction) {
  return (interaction.user.id === config.oid || interaction.memberPermissions?.has(PermissionFlagsBits.Administrator, true))
}

export function isOwner(id: string) {
  return id === config.oid
}

export function logTime() {
  const now = new Date()
  console.log(now.toTimeString())
}
