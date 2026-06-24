import randomFn from 'random'

import type { Nullable } from '@/types/general'
import * as dict from '@/data/menu/dictionary'
import * as dinner from '@/data/menu/dinner'
import * as drinks from '@/data/menu/drinks'
import { matchPatterns, matchPatternsSimple, mealMatch, replyTemplate, translations } from '@/data/menu/utils'

export type FoodOrDrink = 'food' | 'drink'
export type FoodDrinkType = 'good' | 'strange' | 'ummm' | 'all'
type TestMode = 1 | 2 | 3

export function pickFood(group: FoodDrinkType = 'all') {
  if (group === 'all') return randomFn.choice(dinner.all())
  return randomFn.choice(dinner[group] ?? dinner.all())
}
export function pickDrinks(group: FoodDrinkType = 'all') {
  if (group === 'all') return randomFn.choice(drinks.all())
  return randomFn.choice(drinks[group] ?? drinks.all())
}
export function pickFoodDrink(type: FoodOrDrink, testMode: TestMode, group: FoodDrinkType = 'all') {
  const dict = new Map([
    [1, { food: '吃什麼自己想啦', drink: '喝什麼自己想啦' }] as const,
    [2, { food: '不要吃', drink: '不要喝' }] as const,
    [3, { food: '那個食物吧', drink: '那個飲料吧' }] as const,
  ])
  return dict.get(testMode)?.[type] ?? (type === 'food' ? pickFood(group) : pickDrinks(group))
}

// #region : 菜單機率
export function outputMenuStat() {
  console.log(getMenuStat())
}
export function getMenuStat() {
  const foodTotalCount = dinner.all().length
  const foodGoodProbi = (dinner.good.length * 100 / foodTotalCount).toFixed(2)
  const foodStrangeProbi = (dinner.strange.length * 100 / foodTotalCount).toFixed(2)
  const foodUmmmProbi = (dinner.ummm.length * 100 / foodTotalCount).toFixed(2)

  const drinksTotalCount = drinks.all().length
  const drinksGoodProbi = (drinks.good.length * 100 / drinksTotalCount).toFixed(2)
  const drinksStrangeProbi = (drinks.strange.length * 100 / drinksTotalCount).toFixed(2)
  const drinksUmmmProbi = (drinks.ummm.length * 100 / drinksTotalCount).toFixed(2)

  return [
    `:cooking:食物菜單裡有 **${foodTotalCount}** 項東西，其中：`,
    `- 正常的東西：有 **${dinner.good.length}** 項，抽到的機率約為 **${foodGoodProbi}%**`,
    `- 難說的東西：有 **${dinner.ummm.length}** 項，抽到的機率約為 **${foodUmmmProbi}%**`,
    `- 奇怪的東西：有 **${dinner.strange.length}** 項，抽到的機率約為 **${foodStrangeProbi}%**`,
    '',
    `:bubble_tea:飲料菜單裡有 **${drinksTotalCount}** 項東西，其中：`,
    `- 正常的東西：有 **${drinks.good.length}** 項，抽到的機率約為 **${drinksGoodProbi}%**`,
    `- 難說的東西：有 **${drinks.ummm.length}** 項，抽到的機率約為 **${drinksUmmmProbi}%**`,
    `- 奇怪的東西：有 **${drinks.strange.length}** 項，抽到的機率約為 **${drinksStrangeProbi}%**`,
  ].join('\n')
}
//  #endregion

// #region : 吃什麼喝什麼

// 觸發的文字
export function isAskingMeal(msg: string) {
  return matchPatternsSimple.some(item => msg.includes(item))
}

// 抽
export function eatDrinkWhat(msg: string, testMode: TestMode): Nullable<string> {
  const meal = mealMatch.find(term => msg.includes(term))
  if (!meal) return null

  const template = replyTemplate(meal)
  const patterns = matchPatterns(meal)
  const match = patterns.find(({ key }) => msg.includes(key))
  if (!match) return null

  try {
    if (match.type === 'food' || match.type === 'drink') {
      const choice = pickFoodDrink(match.type, testMode, match.group)!
      const reply = dict[match.type].get(choice)?.[match.lang] ?? template[match.type]?.[match.lang]
      return reply?.replace(`{meal}`, meal).replace(`{${match.type}}`, choice)
    } else {
      const choice = {
        food: pickFoodDrink('food', testMode, match.group)!,
        drink: pickFoodDrink('drink', testMode, match.group)!,
      }
      const reply = {
        food: dict.setMeal.get(choice.food)?.[match.lang] ?? template.setMeal.food[match.lang],
        drink: dict.setMeal.get(choice.drink)?.[match.lang] ?? template.setMeal.drink[match.lang],
      }
      return Object.values(reply).join('\n').replace(`{food}`, choice.food).replace(`{drink}`, choice.drink)
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

// #endregion

// #region : 辨別菜單
export function isCheckingMenu(msg: string) {
  return msg.startsWith('菜單有沒有')
}

interface identifyItemRet {
  type: FoodOrDrink
  matchType: 'exact' | 'similar'
  matchedKey: string
  menuType: FoodDrinkType
}
export function identifyItem(item: string): identifyItemRet | null {
  // const output = {
  //   type: "food|drink",
  //   matchType: "exact|similar",
  //   matchedKey: "",
  //   menuType: "good|strange",
  // };
  // find for exact match
  if (dinner.ummm.includes(item)) {
    return {
      type: 'food',
      matchType: 'exact',
      matchedKey: item,
      menuType: 'ummm',
    }
  } else if (dinner.good.includes(item)) {
    return {
      type: 'food',
      matchType: 'exact',
      matchedKey: item,
      menuType: 'good',
    }
  } else if (dinner.strange.includes(item)) {
    return {
      type: 'food',
      matchType: 'exact',
      matchedKey: item,
      menuType: 'strange',
    }
  } else if (drinks.ummm.includes(item)) {
    return {
      type: 'drink',
      matchType: 'exact',
      matchedKey: item,
      menuType: 'ummm',
    }
  } else if (drinks.good.includes(item)) {
    return {
      type: 'drink',
      matchType: 'exact',
      matchedKey: item,
      menuType: 'good',
    }
  } else if (drinks.strange.includes(item)) {
    return {
      type: 'drink',
      matchType: 'exact',
      matchedKey: item,
      menuType: 'strange',
    }
  }

  // find for similar match
  let matchedItem = dinner.ummm.find(menuItem => menuItem.includes(item))
  if (matchedItem) {
    return {
      type: 'food',
      matchType: 'similar',
      matchedKey: matchedItem,
      menuType: 'ummm',
    }
  }
  matchedItem = dinner.good.find(menuItem => menuItem.includes(item))
  if (matchedItem) {
    return {
      type: 'food',
      matchType: 'similar',
      matchedKey: matchedItem,
      menuType: 'good',
    }
  }
  matchedItem = dinner.strange.find(menuItem => menuItem.includes(item))
  if (matchedItem) {
    return {
      type: 'food',
      matchType: 'similar',
      matchedKey: matchedItem,
      menuType: 'strange',
    }
  }
  matchedItem = drinks.ummm.find(menuItem => menuItem.includes(item))
  if (matchedItem) {
    return {
      type: 'drink',
      matchType: 'similar',
      matchedKey: matchedItem,
      menuType: 'ummm',
    }
  }
  matchedItem = drinks.good.find(menuItem => menuItem.includes(item))
  if (matchedItem) {
    return {
      type: 'drink',
      matchType: 'similar',
      matchedKey: matchedItem,
      menuType: 'good',
    }
  }
  matchedItem = drinks.strange.find(menuItem => menuItem.includes(item))
  if (matchedItem) {
    return {
      type: 'drink',
      matchType: 'similar',
      matchedKey: matchedItem,
      menuType: 'strange',
    }
  }

  return null
}

export function checkItem(item: string) {
  const res = identifyItem(item)
  if (!res) return '沒有'

  if (res.matchType === 'exact') {
    return `**「${item}」**有在 **${translations.get(res.type)}** 菜單裡，屬於 **${translations.get(res.menuType)}** 類別`
  } else {
    return `**「${item}」**沒有在菜單裡。最相似的項目是 **${translations.get(res.type)}** 菜單裡的 **「${res.matchedKey}」**，屬於 **${translations.get(res.menuType)}** 類別`
  }
}
//  #endregion
