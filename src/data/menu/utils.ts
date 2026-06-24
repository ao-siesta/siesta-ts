import type { FoodDrinkType, FoodOrDrink } from '@/modules/messageUtility/menu/foodDrink'

type MenuLang = 'cn' | 'canto'
type FoodDrinkMeal = FoodOrDrink | 'setMeal'

export const translations = new Map([
  ['food', '食物'],
  ['drink', '飲品'],
  ['good', '正常'],
  ['ummm', '難說欸'],
  ['strange', '奇怪'],
])
// 時間和類別
export const mealMatch = [
  '早上',
  '朝早',
  '上午',
  '上晝',
  '中午',
  '晏晝',
  '下午',
  '下晝',
  '晚上',
  '夜晚',
  '今早',
  '今朝',
  '今晚',
  '明天',
  '聽日',
  '明早',
  '聽朝',
  '明晚',
  '聽晚',
  '昨天',
  '昨日',
  '昨早',
  '昨晚',
  '昨午',
  '昨天早上',
  '昨天晚上',
  '昨天上午',
  '昨天中午',
  '昨天下午',
  '尋日',
  '尋晚',
  '昨午',
  '尋日朝早',
  '尋日夜晚',
  '尋日上晝',
  '尋日晏晝',
  '尋日下晝',
  '前天',
  '前日',
  '前晚',
  '前天早上',
  '前天晚上',
  '前天上午',
  '前天中午',
  '前天下午',
  '前日朝早',
  '前日夜晚',
  '前日上晝',
  '前日晏晝',
  '前日下晝',
  '待會',
  '陣間',
  '早餐',
  '中餐',
  '午餐',
  '下午茶',
  '晚餐',
  '宵夜',
  '消夜',
  '前菜',
  '主菜',
  '正餐',
  '甜品',
  '甜點',
  '零食',
  '小吃',
  '聖誕',
  '聖誕節',
  '聖誕大餐',
  '拳擊日',
  'Boxing Day',
  '冬至',
  '除夕',
  '除夕夜',
  '除夕晚',
  '除夕晚上',
  '元旦',
  '過年',
  '新年',
  '正月',
  '清明',
  '清明節',
  '清明大餐',
  '餓鬼節',
  '復活節',
  '佛誕',
  '國慶',
  '重陽',
  '重陽節',
  '端午',
  '端午節',
  '中秋',
  '中秋節',
  '巴尼陣亡紀念日',
  '生日',
  '光棍節',
  '黑色星期五',
  'Black Friday',
  '網絡星期一',
  'Cyber Monday',
  '感恩節',
].sort((a, b) => b.length - a.length)

// 觸發的文字
export const matchPatternsSimple = [
  '吃什麼',
  '吃甚麼',
  '食咩',
  '食乜',
  '喝什麼',
  '喝甚麼',
  '飲咩',
  '飲乜',
  '來個套餐',
  '來份套餐',
  '要個套餐',
  '要份套餐',
  '來個正常套餐',
  '來份正常套餐',
  '要個正常套餐',
  '要份正常套餐',
  '來個奇怪套餐',
  '來份奇怪套餐',
  '要個奇怪套餐',
  '要份奇怪套餐',
  '來個難說欸套餐',
  '來份難說欸套餐',
  '要個難說欸套餐',
  '要份難說欸套餐',
]

interface MatchPatternsItem {
  key: string
  type: FoodDrinkMeal
  lang: MenuLang
  group: FoodDrinkType
}
export function matchPatterns(meal?: string): MatchPatternsItem[] {
  return [
    { key: `喝什麼正常的`, type: 'drink', lang: 'cn', group: 'good' },
    { key: `喝甚麼正常的`, type: 'drink', lang: 'cn', group: 'good' },

    { key: `喝什麼奇怪的`, type: 'drink', lang: 'cn', group: 'strange' },
    { key: `喝甚麼奇怪的`, type: 'drink', lang: 'cn', group: 'strange' },

    { key: `喝什麼難說欸的`, type: 'drink', lang: 'cn', group: 'ummm' },
    { key: `喝甚麼難說欸的`, type: 'drink', lang: 'cn', group: 'ummm' },

    { key: `喝什麼`, type: 'drink', lang: 'cn', group: 'all' },
    { key: `喝甚麼`, type: 'drink', lang: 'cn', group: 'all' },

    // ---------------------------------------------------------

    { key: `飲咩正常野`, type: 'drink', lang: 'canto', group: 'good' },
    { key: `飲乜正常野`, type: 'drink', lang: 'canto', group: 'good' },

    { key: `飲咩奇怪野`, type: 'drink', lang: 'canto', group: 'strange' },
    { key: `飲乜奇怪野`, type: 'drink', lang: 'canto', group: 'strange' },

    { key: `飲咩難說欸野`, type: 'drink', lang: 'canto', group: 'ummm' },
    { key: `飲乜難說欸野`, type: 'drink', lang: 'canto', group: 'ummm' },

    { key: `飲咩`, type: 'drink', lang: 'canto', group: 'all' },
    { key: `飲乜`, type: 'drink', lang: 'canto', group: 'all' },

    // ---------------------------------------------------------

    { key: `來個正常套餐`, type: 'setMeal', lang: 'cn', group: 'good' },
    { key: `來份正常套餐`, type: 'setMeal', lang: 'cn', group: 'good' },
    { key: `要個正常套餐`, type: 'setMeal', lang: 'canto', group: 'good' },
    { key: `要份正常套餐`, type: 'setMeal', lang: 'canto', group: 'good' },

    { key: `來個奇怪套餐`, type: 'setMeal', lang: 'cn', group: 'strange' },
    { key: `來份奇怪套餐`, type: 'setMeal', lang: 'cn', group: 'strange' },
    { key: `要個奇怪套餐`, type: 'setMeal', lang: 'canto', group: 'strange' },
    { key: `要份奇怪套餐`, type: 'setMeal', lang: 'canto', group: 'strange' },

    { key: `來個難說欸套餐`, type: 'setMeal', lang: 'cn', group: 'ummm' },
    { key: `來份難說欸套餐`, type: 'setMeal', lang: 'cn', group: 'ummm' },
    { key: `要個難說欸套餐`, type: 'setMeal', lang: 'canto', group: 'ummm' },
    { key: `要份難說欸套餐`, type: 'setMeal', lang: 'canto', group: 'ummm' },

    { key: `來個套餐`, type: 'setMeal', lang: 'cn', group: 'all' },
    { key: `來份套餐`, type: 'setMeal', lang: 'cn', group: 'all' },
    { key: `要個套餐`, type: 'setMeal', lang: 'canto', group: 'all' },
    { key: `要份套餐`, type: 'setMeal', lang: 'canto', group: 'all' },

    // ---------------------------------------------------------

    ...meal
      ? [
        { key: `${meal}吃什麼正常的`, type: 'food', lang: 'cn', group: 'good' },
        { key: `${meal}吃甚麼正常的`, type: 'food', lang: 'cn', group: 'good' },
        { key: `${meal}食咩正常野`, type: 'food', lang: 'canto', group: 'good' },
        { key: `${meal}食乜正常野`, type: 'food', lang: 'canto', group: 'good' },

        { key: `${meal}吃什麼奇怪的`, type: 'food', lang: 'cn', group: 'strange' },
        { key: `${meal}吃甚麼奇怪的`, type: 'food', lang: 'cn', group: 'strange' },
        { key: `${meal}食咩奇怪野`, type: 'food', lang: 'canto', group: 'strange' },
        { key: `${meal}食乜奇怪野`, type: 'food', lang: 'canto', group: 'strange' },

        { key: `${meal}吃什麼難說欸的`, type: 'food', lang: 'cn', group: 'ummm' },
        { key: `${meal}吃甚麼難說欸的`, type: 'food', lang: 'cn', group: 'ummm' },
        { key: `${meal}食咩難說欸野`, type: 'food', lang: 'canto', group: 'ummm' },
        { key: `${meal}食乜難說欸野`, type: 'food', lang: 'canto', group: 'ummm' },

        { key: `${meal}吃什麼`, type: 'food', lang: 'cn', group: 'all' },
        { key: `${meal}吃甚麼`, type: 'food', lang: 'cn', group: 'all' },
        { key: `${meal}食咩`, type: 'food', lang: 'canto', group: 'all' },
        { key: `${meal}食乜`, type: 'food', lang: 'canto', group: 'all' },
      ] satisfies MatchPatternsItem[]
      : [],
  ]
}

export function replyTemplate(meal?: string) {
  return {
    drink: { cn: `就喝{drink}`, canto: `就飲{drink}` },
    setMeal: {
      food: { cn: `那就吃{food}`, canto: `咁就食{food}` },
      drink: { cn: `飲料的話就要{drink}`, canto: `野飲就要{drink}` },
    },
    ...meal ? { food: { cn: `${meal}就吃{food}`, canto: `${meal}就食{food}` } } : {},
  }
}
