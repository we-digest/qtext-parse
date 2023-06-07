import { expect, it } from 'vitest'
import { segmentText } from './segment-text'

it('segmentText - middle [404]', () => {
  let text = `
新数字经济协定[强]
foo bar
[]
[404]
毕业生就业压力[白眼]
  `.trim()
  expect(segmentText(text)).toMatchInlineSnapshot(`
    [
      {
        "text": "新数字经济协定",
        "type": "text",
      },
      {
        "index": 79,
        "type": "qqface",
      },
      {
        "text": "
    foo bar
    []
    [404]
    毕业生就业压力",
        "type": "text",
      },
      {
        "index": 22,
        "type": "qqface",
      },
    ]
  `)
})
