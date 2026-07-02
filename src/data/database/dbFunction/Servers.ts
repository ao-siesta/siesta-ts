import { Sequelize } from 'sequelize'
import { quoteString } from '@/utils/general'
import servers from '../dbStructure/Servers'

const db = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
})

export default class ServerDB {
  server: ReturnType<typeof servers>

  constructor() {
    this.server = servers(db)
  }

  async addServer(guildId: string, guildName: string, adminrole: string) {
    await this.server.create({
      server_id: guildId,
      server_name: guildName,
      adminrole,
    })
  }

  async updateServer(guildId: string, guildName: string, adminrole?: string) {
    await this.server.update({
      server_name: guildName,
      adminrole,
    }, { where: { server_id: guildId } })
  }

  async findServer(guildId: string) {
    return await this.server.findOne({ where: { server_id: guildId }, raw: true })
  }

  async findAdminRole(guildId: string) {
    const server = await this.server.findOne({ where: { server_id: guildId } })
    return server?.get('adminrole') ?? null
  }

  async listServer() {
    const servers = await this.server.findAll()
    return servers.map(s => `${quoteString(s.server_id)} ${quoteString(s.server_name)}: ${quoteString(s.adminrole)} <@${s.adminrole}>`).join('\n')
  }

  async allServerId() {
    const servers = await this.server.findAll()
    return servers.map(s => s.server_id)
  }
}
