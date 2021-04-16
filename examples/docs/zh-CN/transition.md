## 内置过渡动画

MelodyUI 内应用在部分组件的过渡动画，你也可以直接使用。在使用之前请阅读(链接 🔗)。

### fade 淡入淡出

:::demo 提供 `m-fade-in-linear` 和 `m-fade-in` 两种效果。

```html
<template>
    <div>
        <m-button @click="show = !show">Click Me</m-button>

        <div style="display: flex; margin-top: 20px; height: 100px;">
            <transition name="m-fade-in-linear">
                <div v-show="show" class="transition-box">.m-fade-in-linear</div>
            </transition>
            <transition name="m-fade-in">
                <div v-show="show" class="transition-box">.m-fade-in</div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            show: true
        })
    }
</script>

<style>
    .transition-box {
        margin-bottom: 10px;
        width: 200px;
        height: 100px;
        border-radius: 4px;
        background-color: #409eff;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
    }
</style>
```

:::

### zoom 缩放

:::demo 提供 `m-zoom-in-center`，`m-zoom-in-top` 和 `m-zoom-in-bottom` 三种效果。

```html
<template>
    <div>
        <m-button @click="show2 = !show2">Click Me</m-button>

        <div style="display: flex; margin-top: 20px; height: 100px;">
            <transition name="m-zoom-in-center">
                <div v-show="show2" class="transition-box">.m-zoom-in-center</div>
            </transition>

            <transition name="m-zoom-in-top">
                <div v-show="show2" class="transition-box">.m-zoom-in-top</div>
            </transition>

            <transition name="m-zoom-in-bottom">
                <div v-show="show2" class="transition-box">.m-zoom-in-bottom</div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            show2: true
        })
    }
</script>

<style>
    .transition-box {
        margin-bottom: 10px;
        width: 200px;
        height: 100px;
        border-radius: 4px;
        background-color: #409eff;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
    }
</style>
```

:::

### collapse 展开折叠

使用 `m-collapse-transition` 组件实现折叠展开效果。

:::demo

```html
<template>
    <div>
        <m-button @click="show3 = !show3">Click Me</m-button>

        <div style="margin-top: 20px; height: 200px;">
            <m-collapse-transition>
                <div v-show="show3">
                    <div class="transition-box">m-collapse-transition</div>
                    <div class="transition-box">m-collapse-transition</div>
                </div>
            </m-collapse-transition>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            show3: true
        })
    }
</script>

<style>
    .transition-box {
        margin-bottom: 10px;
        width: 200px;
        height: 100px;
        border-radius: 4px;
        background-color: #409eff;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
    }
</style>
```

:::

### 按需引入

```js
// fade/zoom 等
import 'melody-ui/lib/theme-chalk/base.css'
// collapse 展开折叠
import CollapseTransition from 'melody-ui/lib/transitions/collapse-transition'
import Vue from 'vue'

Vue.component(CollapseTransition.name, CollapseTransition)
```
