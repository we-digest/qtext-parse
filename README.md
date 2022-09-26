# 含QQ表情 文本替换解析库

经典QQ表情/文字替换 + png/gif图片<br> 部分依赖于[qqface](https://github.com/fritx/qqface)
实际使用 以小程序场景为例 参考[wxacomp-qtext](https://github.com/we-digest/wxacomp-qtext)

```sh
npm install --save qtext-parse
```

```js
import { replaceCharSymbols, segmentText } from 'qtext-parse'
```

segmentText:

```js
segmentText(`https://mp.weixin.qq.com/s/jLMBp1e7BC-PGr2tLEQpRQ
周日读报[愉快]
新数字经济协定[强]
毕业生就业压力[白眼]
鼓励生育政策多[玫瑰]
居民用电高档贵[悠闲]
煤炭产量有保障[Rich]
汽车消费发补贴[色]`)
//=> [
//   {
//     "type": "text",
//     "text": "https://mp.weixin.qq.com/s/jLMBp1e7BC-PGr2tLEQpRQ\n周日读报",
//   },
//   { "type": "qqface", "index": 21 },
//   { "type": "text", "text": "\n新数字经济协定" },
//   { "type": "qqface", "index": 79 },
//   // ...
// ]
```

返回的segments 对应的渲染逻辑:

```html
<wxs module="m1">
  var qqfaceUrl = 'https://unpkg.com/qqface@0.1.2/img/'
  module.exports.getQQfaceUrl = function (item) {
    // 注意 png仅支持 0~104 gif支持0~121
    return qqfaceUrl + item.index + (item.index > 104 ? '.gif' : '.png')
  }
</wxs>

<view class="qtext">
  <block wx:for-items="{{segments}}" wx:key="index">
    <!-- 这里在表情图标左右插入text空格 是为了添加下划线时能被覆盖到 -->
    <image wx:if="{{item.type === 'qqface'}}"> class="image" src="{{m1.getQQfaceUrl(item)}}"></image>
    <text wx:elif="{{item.type === 'text'}}" class="text">{{item.text}}</text>
  </block>
</view>
```

replaceCharSymbols:

```js
replaceCharSymbols(`https://mp.weixin.qq.com/s/jLMBp1e7BC-PGr2tLEQpRQ
周日读报/:,@-D
新数字经济协定/:strong
毕业生就业压力/::d
鼓励生育政策多/:rose
居民用电高档贵/::,@
煤炭产量有保障[Rich]
汽车消费发补贴/::B`)
//=> `https://mp.weixin.qq.com/s/jLMBp1e7BC-PGr2tLEQpRQ
// 周日读报[愉快]
// 新数字经济协定[强]
// 毕业生就业压力[白眼]
// 鼓励生育政策多[玫瑰]
// 居民用电高档贵[悠闲]
// 煤炭产量有保障[Rich]
// 汽车消费发补贴[色]`
```
