import { Sequelize } from 'sequelize'
import botChannel from '../dbStructure/BotChannel'

const db = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
})

export default class Botzone {
  channel: ReturnType<typeof botChannel>

  constructor() {
    this.channel = botChannel(db)
  }

  async addBotZone(channel_id: string) {
    await this.channel.create({ channel_id })
  }

  async findChannel(channel_id: string) {
    const channel = await this.channel.findOne({ where: { channel_id }, raw: true })
    return channel
  }

  async deleteChannel(channel_id: string) {
    await this.channel.destroy({ where: { channel_id } })
  }
}
