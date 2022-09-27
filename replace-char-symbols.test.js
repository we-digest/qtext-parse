import { expect } from 'chai'
import { replaceCharSymbols } from './replace-char-symbols.js'

export let test = () => {
  let text = `
https://mp.weixin.qq.com/s/jLMBp1e7BC-PGr2tLEQpRQ
周日读报/:,@-D
新数字经济协定/:strong
毕业生就业压力/::d
鼓励生育政策多/:rose
居民用电高档贵/::,@
煤炭产量有保障[Rich]
汽车消费发补贴/::B
/:foo bar
  `.trim()
  expect(replaceCharSymbols(text)).to.equal(`
https://mp.weixin.qq.com/s/jLMBp1e7BC-PGr2tLEQpRQ
周日读报[愉快]
新数字经济协定[强]
毕业生就业压力[白眼]
鼓励生育政策多[玫瑰]
居民用电高档贵[悠闲]
煤炭产量有保障[Rich]
汽车消费发补贴[色]
/:foo bar
  `.trim())
}
