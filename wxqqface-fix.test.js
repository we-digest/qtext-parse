import { expect, it } from 'vitest'
import { replaceCharSymbols } from './replace-char-symbols.js'

it('wx-qqface fix', () => {
  let text = `
丰田华为合作？/::O
/::X /::Z
/::'( /::-| /::@ /::P /::D /::O /::(
/::+ /:--b
  `.trim()
  expect(replaceCharSymbols(text)).toEqual(`
丰田华为合作？[惊讶]
[闭嘴] [睡]
[大哭] [尴尬] [发怒] [调皮] [呲牙] [惊讶] [难过]
[酷] [冷汗]
  `.trim())
})
