import { indexFromText } from 'qqface'

export let segmentText = (str = '') => {
  let segments = []
  let reg = /\[([^\]]+)\]/
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
      let stub = mirror.slice(mat.index, mat.index + m0.length).replace(/./g, 'x')
      mirror = stub + mirror.slice(mat.index + m0.length)
    }
  }
  if (str) segments.push({ type: 'text', text: str })
  return segments
}
