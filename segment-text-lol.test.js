import { expect, it } from 'vitest'
import { segmentText } from './segment-text'

it('segmentText - [Lol]', () => {
  let text = `
https://mp.weixin.qq.com/s/jLMBp1e7BC-PGr2tLEQpRQ
周二读报[愉快]
中小银行降利率[Lol]
非学科培训监测[悠闲]
  `.trim()
  expect(segmentText(text)).toMatchInlineSnapshot(`
    [
      {
        "text": "https://mp.weixin.qq.com/s/jLMBp1e7BC-PGr2tLEQpRQ
    周二读报",
        "type": "text",
      },
      {
        "index": 21,
        "type": "qqface",
      },
      {
        "text": "
    中小银行降利率😂
    非学科培训监测",
        "type": "text",
      },
      {
        "index": 29,
        "type": "qqface",
      },
    ]
  `)
})
