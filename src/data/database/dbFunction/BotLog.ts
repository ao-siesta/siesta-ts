import { Sequelize } from 'sequelize'
import botLog from '../dbStructure/BotLog'

const db = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
})

export default class BotLog {
  server: ReturnType<typeof botLog>

  constructor() {
    this.server = botLog(db)
  }

  async addLogChannel(server_id: string, server_name: string, channel_id: string) {
    await this.server.create({ server_id, server_name, channel_id })
  }

  async findLogChannel(server_id: string) {
    const server = await this.server.findOne({ where: { server_id }, raw: true })
    // console.log(channel)
    return server
  }

  async logChannelId(server_id: string) {
    const server = await this.server.findOne({ where: { server_id } })
    if (server == null) {
      return false
    } else {
      return server.get('channel_id')
    };
  }

  async deleteLogChannel(server_id: string) {
    await this.server.destroy({ where: { server_id } })
  }
}
