type Characters = 'エミリア' | 'めぐみん' | 'シエスタ' | 'シエル' | 'イレイナ'

interface CharacterList {
  list: Characters[]
  characters: {
    name: Characters
    icon: string
  }[]
}

export default {
  list: ['エミリア', 'めぐみん', 'シエスタ', 'シエル', 'イレイナ'],
  characters: [
    { name: 'エミリア', icon: './botAvatar/emilia.png' },
    { name: 'めぐみん', icon: './botAvatar/megumin.png' },
    { name: 'シエスタ', icon: './botAvatar/siesta.png' },
    { name: 'シエル', icon: './botAvatar/siel.png' },
    { name: 'イレイナ', icon: './botAvatar/elaina.png' },
  ],
} satisfies CharacterList
