import { expect, it } from 'vitest'
import { segmentText } from './segment-text'

it('segmentText - emoji', () => {
  let text = `
[Facepalm][捂脸]
[Awesome][Wow][Party]
[LetMeSee][Concerned][Blessing]
  `.trim()
  expect(segmentText(text)).toMatchInlineSnapshot(`
    [
      {
        "text": "😳😳
    👍😍🎉
    👀🥺🙏",
        "type": "text",
      },
    ]
  `)
})
