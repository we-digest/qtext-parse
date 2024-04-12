import { indexFromText } from 'qqface'

// WeChat Emoji
// https://emojipedia.org/wechat
let latestEmojiMap = Object.create(null)
Object.assign(latestEmojiMap, {
  'Lol': '😂',
  '破涕为笑': '😂',
  // ** 注意[捂脸]在部分半严肃语境下不应包含笑脸
  // 😅 😭 😳 😦 😯 😱
  'Facepalm': '😳', // fallback
  '捂脸': '😳', // fallback
  'Terror': '😱',
  '恐惧': '😱',
  'Flushed': '😳',
  '脸红': '😳',
  'Emm': '😶',
  'Awesome': '👍', // fallback
  '666': '👍', // fallback
  // 'LetMeSee': '🧐', // fallback
  // '让我看看': '🧐', // fallback
  'LetMeSee': '👀', // fallback
  '让我看看': '👀', // fallback
  'Boring': '[白眼]',
  '翻白眼': '[白眼]',
  'Wow': '😍',
  '哇': '😍',
  'MyBad': '🤕',
  '打脸': '🤕',
  'NoProb': '👌',
  '好的': '👌',
  'Respect': '👍', // fallback
  '社会社会': '👍', // fallback
  'Doge': '😉', // fallback
  '旺柴': '😉', // fallback
  'Sweats': '😓',
  '汗': '😓',
  'OMG': '😯',
  '天啊': '😯',
  'Sigh': '😞',
  '叹气': '😞',
  'Broken': '💔', // fallback
  '裂开': '💔', // fallback
  // '嘴唇': '👄',
  '嘴唇': '[示爱]',
  // 'BrokenHeart': '💔', // fallback
  // '心碎': '💔', // fallback
  'Hurt': '😭',
  '苦涩': '😭',
  'Packet': '🧧',
  '红包': '🧧',
  'GoForIt': '[奋斗]',
  '加油': '[奋斗]',
  'Onlooker': '👀',
  '吃瓜': '👀',
  'Concerned': '🥺',
  '皱眉': '🥺',
  'Yeah!': '🥳',
  '耶': '🥳',
  'Smirk': '😏',
  '奸笑': '😏',
  'Smart': '👏', // fallback
  '机智': '👏', // fallback
  'Hey': '👋', // fallback
  '嘿哈': '👋', // fallback
  'Duh': '😒',
  '无语': '😒',
  'LetDown': '😔',
  '失望': '😔',
  'Sick': '😷',
  '生病': '😷',
  'ThumbsUp': '[强]',
  'ThumbsDown': '[弱]',
  'Fireworks': '🎆',
  '烟花': '🎆',
  '爆竹': '🧨',
  'Party': '🎉',
  '庆祝': '🎉',
  'Blessing': '🙏', // fallback
  '福': '🙏', // fallback
  'Worship': '🙏',
  '合十': '🙏',
})
let latestEmojiKeys = Object.keys(latestEmojiMap)
let latestEmojiRegexG = new RegExp(`\\[(${latestEmojiKeys.join('|')})\\]`, 'g')

export let segmentText = (str = '') => {
  str = str.replace(latestEmojiRegexG, ($0, $1) => latestEmojiMap[$1] || $0)
  let segments = []
  let reg = /\[(.{1,10}?)\]/
  let mat = null
  let mirror = str
  while (mat = mirror.match(reg)) {
    let [m0, m1] = mat
    let index = indexFromText(m1)
    if (index > -1) {
      let prev = str.slice(0, mat.index)
      if (prev) segments.push({ type: 'text', text: prev })
      segments.push({ type: 'qqface', index: indexFromText(m1) })
      str = str.slice(mat.index + m0.length)
      mirror = mirror.slice(mat.index + m0.length)
    } else {
      let stub = mirror.slice(0, mat.index + m0.length).replace(/[\s\S]/g, 'x')
      mirror = stub + mirror.slice(mat.index + m0.length)
    }
  }
  if (str) segments.push({ type: 'text', text: str })
  return segments
}
