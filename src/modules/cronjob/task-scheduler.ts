import type { Client } from 'discord.js'
import c from 'ansis'
import CronJobHelper from './helper'

/**
 * Task list item structure
 */
interface ListItem {
  /**
   * Name of the task
   */
  name: string
  /**
   * Cron expression for "other" type
   */
  period?: string
  /**
   * Task function to execute
   */
  task: (client: Client) => void
}

/**
 * Period type for task scheduling
 */
type Period = 'minute' | 'hour' | 'daily' | 'month' | 'other'

/**
 * Task scheduler class for managing cron jobs
 */
class TaskScheduler {
  readonly taskList: Map<Period, Set<ListItem>>

  /**
   * Creates a new TaskScheduler instance
   */
  constructor() {
    /**
     * Map of scheduled tasks organized by interval type
     */
    this.taskList = new Map<Period, Set<ListItem>>([
      ['minute', new Set()],
      ['hour', new Set()],
      ['daily', new Set()],
      ['month', new Set()],
      ['other', new Set()],
    ])
  }

  /**
   * Get a list of the jobs per minute
   * @returns - Number of jobs in an Object
   */
  get minuteJobs(): Set<ListItem> {
    return this.taskList.get('minute')!
  }

  /**
   * Get a list of the hourly jobs
   * @returns - Number of jobs in an Object
   */
  get hourJobs(): Set<ListItem> {
    return this.taskList.get('hour')!
  }

  /**
   * Get a list of the daily jobs
   * @returns - Number of jobs in an Object
   */
  get dailyJobs(): Set<ListItem> {
    return this.taskList.get('daily')!
  }

  /**
   * Get a list of the monthly jobs
   * @returns - Number of jobs in an Object
   */
  get monthJobs(): Set<ListItem> {
    return this.taskList.get('month')!
  }

  /**
   * Get a list of the jobs
   * @returns - Number of jobs in an Object
   */
  get jobsCount(): Record<Period | 'Total', number> {
    const list: Array<[Period | 'Total', number]> = Array.from(this.taskList.entries()).map(([key, value]) => [key, value.size])
    list.push(['Total', list.reduce<number>((total, [_, count]) => total + count, 0)])

    return Object.fromEntries(list) as Record<Period | 'Total', number>
  }

  /**
   * Get a list of the jobs
   * @returns - Job list
   */
  get jobList(): string {
    const output: string[] = []
    Array.from(this.taskList.entries()).forEach(([period, list]) => {
      if (list.size > 0) {
        output.push(c.cyan.bold`${capitalize(period)}:`)
        list.forEach(item => output.push(`${c.cyan('-')} ${item.period ? c.green`[${item.period}]` : ''} ${item.name}`))
      } else {
        output.push(`${c.cyan.bold`${capitalize(period)}:`} None`)
      }
    })

    return output.join('\n')
  }

  /**
   * Add task to the task list
   * @param period - Period type for task scheduling
   * @param task - Task name and function to be executed
   *
   * @returns - Success or not
   */
  addTask(period: Period, task: ListItem): boolean {
    const list = this.taskList.get(period)
    if (list && task.name) {
      list.add(task)
      return true
    }
    return false
  }

  setup(client: Client, cronHelper: CronJobHelper) {
    if (this.taskList.get('minute')!.size) {
      cronHelper.setRepeatAction(CronJobHelper.MINUTE, () => {
        this.taskList.get('minute')!.forEach(t => t.task(client))
      })
    }
    if (this.taskList.get('hour')!.size) {
      cronHelper.setRepeatAction(CronJobHelper.HOUR, () => {
        this.taskList.get('hour')!.forEach(t => t.task(client))
      })
    }
    if (this.taskList.get('daily')!.size) {
      cronHelper.setRepeatAction(CronJobHelper.DAILY, () => {
        this.taskList.get('daily')!.forEach(t => t.task(client))
      })
    }
    if (this.taskList.get('month')!.size) {
      cronHelper.setRepeatAction(CronJobHelper.MONTH, () => {
        this.taskList.get('month')!.forEach(t => t.task(client))
      })
    }
    if (this.taskList.get('other')!.size) {
      this.taskList.get('other')!.forEach((t) => {
        if (t.period) {
          cronHelper.setRepeatAction(t.period, () => t.task(client))
        }
      })
    }
  }
}

/**
 * Capitalize the first letter of a word (Support single word only)
 * @param str - The word to be processed
 * @returns Capitalized word
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const scheduler = new TaskScheduler()

export default scheduler
