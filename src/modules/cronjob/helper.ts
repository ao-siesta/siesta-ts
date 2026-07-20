/**
 * Cron job scheduling module for Discord.js client
 * Provides utilities for scheduling recurring Discord messages and actions.
 * Uses node-cron for schedule management.
 * @see https://crontab.guru/ for cron syntax reference
 * @see https://discord.js.org/#/docs/discord.js/v13/typedef/MessageOptions for message options
 */

import type { BaseMessageOptions, Client } from 'discord.js'
import { schedule } from 'node-cron'

/**
 * Cron job scheduler class for managing scheduled Discord bot actions
 * @class cronJobHelper
 */
export default class CronJobHelper {
  /**
   * Cron expression: Every minute
   */
  static MINUTE = '* * * * *' as const
  /**
   * Cron expression: Every hour
   */
  static HOUR = '0 * * * *' as const
  /**
   * Cron expression: Daily at 00:00 (midnight)
   */
  static DAILY = '0 */24 * * *' as const
  /**
   * Cron expression: First day of every month at 00:00
   */
  static MONTH = '0 0 1 * *' as const

  readonly client: Client
  readonly channelId: string

  /**
   * Creates a new cronJob instance
   * @constructor
   * @param client - The Discord.js client instance
   * @param channelId - Default channel ID for scheduling messages (can be overridden per method)
   */
  constructor(client: Client, channelId: string) {
    this.client = client
    this.channelId = channelId
  }

  /**
   * Schedule a simple text message to be sent at recurring intervals
   * @param period - Cron expression for schedule (e.g., '0 * * * *' for hourly)
   * @param message - Plain text message content to send
   * @param channelId - Discord channel ID to send message to
   * @throws  If channelId is not provided and no default is set
   */
  setPlainMessage(period: string, message: string, channelId: string = this.channelId): void {
    if (!channelId) throw new Error('Channel ID not provided')

    schedule(period, async () => {
      const channel = this.client.channels.cache.get(channelId)
      if (channel && channel.isSendable()) await channel.send({ content: message })
    })
  }

  /**
   * Schedule an embedded message to be sent at recurring intervals
   * @param period - Cron expression for schedule
   * @param embed_message - Array of Discord embed objects to send
   * @param channelId - Discord channel ID to send message to
   * @throws If channelId is not provided and no default is set
   */
  setEmbedMessage(period: string, embed_message: BaseMessageOptions['embeds'], channelId: string = this.channelId): void {
    if (!channelId) throw new Error('Channel ID not provided')

    schedule(period, async () => {
      const channel = this.client.channels.cache.get(channelId)
      if (channel && channel.isSendable()) await channel.send({ embeds: embed_message })
    })
  }

  /**
   * Schedule a message with custom MessageOptions to be sent at recurring intervals
   * Accepts any valid Discord.js MessageOptions object for maximum flexibility
   * @param period - Cron expression for schedule
   * @param content - Discord.js MessageOptions object
   * @param channelId - Discord channel ID to send message to
   * @throws If channelId is not provided and no default is set
   * @see https://discord.js.org/#/docs/discord.js/v13/typedef/MessageOptions for content structure
   */
  setFreeMessage(period: string, content: BaseMessageOptions, channelId: string = this.channelId): void {
    if (!channelId) throw new Error('Channel ID not provided')

    schedule(period, async () => {
      const channel = this.client.channels.cache.get(channelId)
      if (channel && channel.isSendable()) await channel.send(content)
    })
  }

  /**
   * Schedule a custom action to execute at recurring intervals
   * @param period - Cron expression for schedule
   * @param action - Callback function to execute on schedule
   */
  setRepeatAction(period: string, action: () => void): void {
    schedule(period, action)
  }
}
