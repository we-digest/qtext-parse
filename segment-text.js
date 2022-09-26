import { indexFromText } from 'qqface'

export let segmentText = (str = '') => {
  let segments = []
  let reg = /\[([^\]]+)\]/
  let mat = null
  while (mat = str.match(reg)) {
    let [m0, m1] = mat
    let index = indexFromText(m1)
    if (index > -1) {
      let prev = str.slice(0, mat.index)
      if (prev) segments.push({ type: 'text', text: prev })
      segments.push({ type: 'qqface', index: indexFromText(m1) })
      str = str.slice(mat.index + m0.length)
    }
  }
  if (str) segments.push({ type: 'text', text: str })
  return segments
}
