import type { ClientEvents } from 'discord.js'

export type Arrayable<T> = T | T[]
export type Nullable<T> = T | undefined | null
export type PartialNull<T extends object> = { [P in keyof T]?: Nullable<T[P]> }

export type WithPrefix<T extends string> = `${T}${string}`

export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const
export type typeDayNames = (typeof dayNames)[number]
export const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const
export type typeDayNamesShort = (typeof dayNamesShort)[number]
export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const
export type typeMonthNames = (typeof monthNames)[number]
export const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const
export type typeMonthNamesShort = (typeof monthNamesShort)[number]

export type MsgCreate = ClientEvents['messageCreate'][0]
export type MsgDelete = ClientEvents['messageDelete'][0]
export type MsgUpdate = ClientEvents['messageUpdate']
