// 这里组合使用wx-qqface和qqface 目的是能得到符合自己预期的与微信对齐的表情text
// https://github.com/fritx/qqface/blob/ecd4dbf4e0733d8060ef90308a14e2830ee8be09/index.js#L10-L40
// https://github.com/uojo/wx-qqface/issues/1
import wxqqface from 'wx-qqface'
import { textFromIndex } from 'qqface'

// 注意 这里wx-qqface导出的charMap实际是数组形式
let charArr = wxqqface.charMap

// 重新转换得到charMap 优化时间复杂度
let charMap = charArr.reduce((acc, v, i) => (acc[v] = i, acc), {})

// 按长度逆序 确保匹配的准确性
let symbolArrSeq = charArr.concat().sort((a, b) => b.length - a.length)

export let replaceCharSymbols = (str = '') => {
  // 进一步缩小有效字符区间 提高匹配精准度 完善当前测试覆盖率
  // return str.replace(/\/:[\u0000-\u00ff]{1,10}/g, $0 => {
  return str.replace(/\/:[\u0021-\u007e]{1,10}/g, $0 => {
    let symbol = symbolArrSeq.find(v => $0.startsWith(v))
    if (symbol) {
      let index = charMap[symbol]
      let label = textFromIndex(index)
      if (label) {
        return '[' + label + ']' + $0.slice(symbol.length)
      }
    }
    return $0
  })
}
