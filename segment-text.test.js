import { expect, it } from 'vitest'
import { segmentText } from './segment-text.js'

it('segmentText', () => {
  let text = `
https://mp.weixin.qq.com/s/jLMBp1e7BC-PGr2tLEQpRQ
周日读报[愉快]
新数字经济协定[强]
毕业生就业压力[白眼]
鼓励生育政策多[玫瑰]
居民用电高档贵[悠闲]
煤炭产量有保障[Rich]
汽车消费发补贴[色]
  `.trim()
  expect(segmentText(text)).toMatchInlineSnapshot(`
    [
      {
        "text": "https://mp.weixin.qq.com/s/jLMBp1e7BC-PGr2tLEQpRQ
    周日读报",
        "type": "text",
      },
      {
        "index": 21,
        "type": "qqface",
      },
      {
        "text": "
    新数字经济协定",
        "type": "text",
      },
      {
        "index": 79,
        "type": "qqface",
      },
      {
        "text": "
    毕业生就业压力",
        "type": "text",
      },
      {
        "index": 22,
        "type": "qqface",
      },
      {
        "text": "
    鼓励生育政策多",
        "type": "text",
      },
      {
        "index": 63,
        "type": "qqface",
      },
      {
        "text": "
    居民用电高档贵",
        "type": "text",
      },
      {
        "index": 29,
        "type": "qqface",
      },
      {
        "text": "
    煤炭产量有保障",
        "type": "text",
      },
      {
        "index": 108,
        "type": "qqface",
      },
      {
        "text": "
    汽车消费发补贴",
        "type": "text",
      },
      {
        "index": 2,
        "type": "qqface",
      },
    ]
  `)
})
