import { Op, Sequelize } from 'sequelize'
import birthday from '../dbStructure/Birthday'

const db = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
})

export default class Birthday {
  userBd: ReturnType<typeof birthday>

  constructor() {
    this.userBd = birthday(db)
  }

  async addBirthday(user_id: string, bdMonth: number, bdDay: number) {
    await this.userBd.create({ user_id, bdMonth, bdDay })
  }

  async birthdayTodayRaw() {
    const now = new Date()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const BD = await this.userBd.findAll({
      where: { bdMonth: month, bdDay: date },
      raw: true,
    })
    return BD
  }

  async birthdayToday() {
    const BD = await this.birthdayTodayRaw()

    let string = '今天沒有人生日～'
    if (BD.length > 0) {
      string = BD.map(d => `:tada: <@${d.user_id}> :tada:`).join('\n')
      string += '\n生日快樂:partying_face:'
    }
    return string
  }

  async isSomeoneBirthdayToday() {
    const now = new Date()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const BD = await this.userBd.findOne({
      where: { bdMonth: month, bdDay: date },
      raw: true,
    })

    return BD !== null
  }

  async birthdayRecent() {
    const now = new Date()
    const month = now.getMonth() + 1
    now.setMonth(month + 1) // Mutate original
    const endMonth = now.getMonth() + 1

    const BD = await this.userBd.findAll({
      where: { bdMonth: { [Op.between]: [month, endMonth] } },
      order: [['bdMonth', 'ASC'], ['bdDay', 'ASC']],
      raw: true,
    })

    let string = '最近沒有人生日～'
    if (BD.length > 0) {
      string = BD.map(d => `<@${d.user_id}> - ${d.bdMonth}月${d.bdDay}日`).join('\n')
    }
    return string
  }

  async showAllBirthday() {
    const bds = await this.userBd.findAll({
      order: [['bdMonth', 'ASC'], ['bdDay', 'ASC']],
      raw: true,
    })
    return bds
  }

  async deleteBirthday(user_id: string) {
    await this.userBd.destroy({ where: { user_id } })
  }

  async findBirthday(user_id: string) {
    const date = await this.userBd.findOne({ where: { user_id }, raw: true })
    return date
  }

  async findFullBirthday(user_id: string) {
    const date = await this.findBirthday(user_id)
    if (!date) return

    const fullBD = `${date.get('bdMonth')}月${date.get('bdDay')}日`
    return fullBD
  }

  async findBirthdayDay(user_id: string) {
    const date = await this.findBirthday(user_id)
    return date?.get('bdDay')
  }

  async findBirthdayMonth(user_id: string) {
    const date = await this.findBirthday(user_id)
    return date?.get('bdMonth')
  }
}
