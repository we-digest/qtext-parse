import { indexFromText } from 'qqface'

let latestEmojiMap = Object.create(null)
Object.assign(latestEmojiMap, {
  'Lol': '😂',
  'Facepalm': '😅',
  '捂脸': '😅',
  'Terror': '😱',
  'Flushed': '😳',
  'Emm': '😶',
  'Awesome': '👍', // fallback
  'LetMeSee': '🧐',
  'Boring': '[白眼]',
  'Wow': '😍',
  'MyBad': '🤕',
  'NoProb': '👌',
  'Respect': '👍', // fallback
  'Sweats': '😓',
  'OMG': '😯',
  'Sigh': '😞',
  'Broken': '💔', // fallback
  'Hurt': '😭',
  'Packet': '🧧',
  'GoForIt': '[奋斗]',
  'Onlooker': '👀',
  'Concerned': '🥺',
  'Yeah!': '🥳',
  'Smirk': '😏',
  'Hey': '👋', // fallback
  'Duh': '😒',
  'LetDown': '😔',
  'Sick': '😷',
  'Worship': '🤕',
  'Party': '🎉',
  'Blessing': '🙏',
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
