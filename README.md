# fix-scroll
基于iscroll的滑动吸顶组件
## use
npm install fix-scroll

# props

name|description|type|isRequired
--|:--:|--:|--:
fixEle|需要吸顶元素类名|string|true
headEle|头部元素类名|string|false
config|iscroll配置对象|string|false
className|自定义样式|string|false
handleScrollStart|滚动开始事件|function|false
handleScroll|滚动事件|function|false
handleScrollEnd|滚动结束事件|function|false
## events
function|description
--|:--:
scrollTo(x, y, time, easing)|滚动到任意的位置
scrollToElement(el, time, offsetX, offsetY, easing)|强制的参数就是el。传递一个元素或者一个选择器。滚动到某个元素左上角位置
fixEleScrollTo(x, y)|吸顶元素滚动到任意的位置
refresh|刷新
## demo
![](https://i.imgur.com/C7GtTlF.gif)
