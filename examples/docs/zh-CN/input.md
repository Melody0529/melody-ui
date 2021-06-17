### Input 输入框

通过鼠标或键盘输入字符

:::warning
Input 为受控组件，它**总会显示 Vue 绑定值**。

通常情况下，应当处理 `input` 事件，并更新组件的绑定值（或使用`v-model`）。否则，输入框内显示的值将不会改变。

不支持 `v-model` 修饰符。
:::

### 基础用法

:::demo
```html
<m-input v-model="input" placeholder="请输入内容"></m-input>

<script>
export default {
    data() {
        return {
            input: ''
        }
    }
}
</script>
```
:::

### 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用 input 组件
```html
<m-input
    placeholder="请输入内容"
    v-model="input"
    :disabled="true">
</m-input>

<script>
export default {
    data() {
        return {
            input: ''
        }
    }
}
</script>
```
:::

### 可清空

:::demo 使用`clearable`属性即可得到一个可清空的输入框
```html
<m-input
    placeholder="请输入内容"
    v-model="input"
    clearable>
</m-input>

<script>
export default {
    data() {
        return {
            input: ''
        }
    }
}
</script>
```
:::

### 密码框

:::demo 使用`show-password`属性即可得到一个可切换显示隐藏的密码框
```html
<m-input placeholder="请输入密码" v-model="input" show-password></m-input>

<script>
export default {
    data() {
        return {
            input: ''
        }
    }
}
</script>
```
:::

### 带 icon 的输入框

带有图标标记输入类型

:::demo 可以通过 `prefix-icon` 和 `suffix-icon` 属性在 input 组件首部和尾部增加显示图标，也可以通过 slot 来放置图标。
```html
<div class="demo-input-suffix">
    属性方式：
    <m-input
        placeholder="请选择日期"
        suffix-icon="m-icon-date"
        v-model="input1">
    </m-input>
    <m-input
        placeholder="请输入内容"
        prefix-icon="m-icon-search"
        v-model="input2">
    </m-input>
</div>
<div class="demo-input-suffix">
    slot 方式：
    <m-input
        placeholder="请选择日期"
        v-model="input3">
        <i slot="suffix" class="m-input__icon m-icon-date"></i>
    </m-input>
    <m-input
        placeholder="请输入内容"
        v-model="input4">
        <i slot="prefix" class="m-input__icon m-icon-search"></i>
    </m-input>
</div>

<script>
export default {
    data() {
        return {
            input1: '',
            input2: '',
            input3: '',
            input4: ''
        }
    }
}
</script>
```
:::

### 文本域

用于输入多行文本信息，通过将 type 属性的值指定为 textarea。

:::demo 文本域高度可通过 `rows` 属性控制
```html
<m-input
    type="textarea"
    :rows="2"
    placeholder="请输入内容"
    v-model="textarea">
</m-input>

<script>
export default {
    data() {
        return {
            textarea: ''
        }
    }
}
</script>
```
:::

### 可自适应文本高度的文本域

通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 `autosize` 还可以设定为一个对象，指定最小行数和最大行数。

:::demo
```html
<m-input
    type="textarea"
    autosize
    placeholder="请输入内容"
    v-model="textarea1">
</m-input>
<div style="margin: 20px 0;"></div>
<m-input
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 4}"
    placeholder="请输入内容"
    v-model="textarea2">
</m-input>

<script>
export default {
    data() {
        return {
            textarea1: '',
            textarea2: ''
        }
    }
}
</script>
```
:::

### 复合型输入框

可前置或后置元素，一般为标签或按钮

:::demo 可通过 slot 来指定在 input 中前置或者后置内容。
```html
<div>
    <m-input placeholder="请输入内容" v-model="input1">
        <template slot="prepend">Http://</template>
    </m-input>
</div>
    <div style="margin-top: 15px;">
    <m-input placeholder="请输入内容" v-model="input2">
        <template slot="append">.com</template>
    </m-input>
</div>
<!-- <div style="margin-top: 15px;">
    <m-input placeholder="请输入内容" v-model="input3" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="餐厅名" value="1"></el-option>
        <el-option label="订单号" value="2"></el-option>
        <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
    </m-input>
</div> -->
<style>
    .m-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>
<script>
export default {
    data() {
        return {
            input1: '',
            input2: '',
            input3: '',
            select: ''
        }
    }
}
</script>
```
:::

### 尺寸

::: demo 可通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small 和 mini 三种尺寸。
```html
<div class="demo-input-size">
    <m-input
        placeholder="请输入内容"
        suffix-icon="m-icon-date"
        v-model="input1">
    </m-input>
    <m-input
        size="medium"
        placeholder="请输入内容"
        suffix-icon="m-icon-date"
        v-model="input2">
    </m-input>
    <m-input
        size="small"
        placeholder="请输入内容"
        suffix-icon="m-icon-date"
        v-model="input3">
    </m-input>
    <m-input
        size="mini"
        placeholder="请输入内容"
        suffix-icon="m-icon-date"
        v-model="input4">
    </m-input>
</div>

<script>
export default {
    data() {
        return {
            input1: '',
            input2: '',
            input3: '',
            input4: ''
        }
    }
}
</script>
```
:::

### 带输入建议

根据输入内容提供对应的输入建议

:::demo autocomplete 是一个可带输入建议的输入框组件，`fetch-suggestions` 是一个返回输入建议的方法属性，如 querySearch(queryString, cb)，在该方法中你可以在你的输入建议数据准备好时通过 cb(data) 返回到 autocomplete 组件中。
```html
```
:::

### 输入长度限制
:::demo  `maxlength` 和 `minlength` 是原生属性，用来限制输入框的字符长度，其中字符长度是用 Javascript 的字符串长度统计的。对于类型为 `text` 或 `textarea` 的输入框，在使用 `maxlength` 属性限制最大输入长度的同时，可通过设置 `show-word-limit` 属性来展示字数统计。
```html
<m-input
    type="text"
    placeholder="请输入内容"
    v-model="text"
    maxlength="10"
    show-word-limit>
</m-input>
<div style="margin: 20px 0;"></div>
<m-input
    type="textarea"
    placeholder="请输入内容"
    v-model="textarea"
    maxlength="30"
    show-word-limit>
</m-input>

<script>
export default {
    data() {
        return {
            text: '',
            textarea: ''
        }
    }
}
</script>
```
:::
### Input Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | text，textarea 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text |
| value / v-model | 绑定值           | string / number  | — | — |
| maxlength     | 原生属性，最大输入长度      | number          |  —  | — |
| minlength     | 原生属性，最小输入长度      | number          | — | — |
| show-word-limit | 是否显示输入字数统计，只在 `type = "text"` 或 `type = "textarea"` 时有效 | boolean    |  —  | false |
| placeholder   | 输入框占位文本    | string          | — | — |
| clearable     | 是否可清空        | boolean         | — | false |
| show-password | 是否显示切换密码图标| boolean         | — | false |
| disabled      | 禁用            | boolean         | — | false   |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | medium / small / mini  | — |
| prefix-icon   | 输入框头部图标    | string          | — | — |
| suffix-icon   | 输入框尾部图标    | string          | — | — |
| rows          | 输入框行数，只对 `type="textarea"` 有效  |  number | — |  2   |
| autosize      | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }  |  boolean / object | — |  false   |
| autocomplete | 原生属性，自动补全 | string | on, off | off |
| auto-complete | 下个主版本弃用 | string | on, off | off |
| name | 原生属性 | string | — | — |
| readonly | 原生属性，是否只读 | boolean | — | false |
| max | 原生属性，设置最大值 | — | — | — |
| min | 原生属性，设置最小值 | — | — | — |
| step | 原生属性，设置输入字段的合法数字间隔 | — | — | — |
| resize | 控制是否能被用户缩放 | string | none, both, horizontal, vertical | — |
| autofocus | 原生属性，自动获取焦点 | boolean | true, false | false |
| form | 原生属性 | string | — | — |
| label | 输入框关联的label文字 | string | — | — |
| tabindex | 输入框的tabindex | string | - | - |
| validate-event | 输入时是否触发表单的校验 | boolean | - | true |

### Input Slots
| name | 说明 |
|------|--------|
| prefix | 输入框头部内容，只对 `type="text"` 有效 |
| suffix | 输入框尾部内容，只对 `type="text"` 有效 |
| prepend | 输入框前置内容，只对 `type="text"` 有效 |
| append | 输入框后置内容，只对 `type="text"` 有效 |

### Input Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 仅在输入框失去焦点或用户按下回车时触发 | (value: string \| number) |
| input | 在 Input 值改变时触发 | (value: string \| number) |
| clear | 在点击由 `clearable` 属性生成的清空按钮时触发 | — |

### Input Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | — |
| blur | 使 input 失去焦点 | — |
| select | 选中 input 中的文字 | — |

### Autocomplete Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| placeholder   | 输入框占位文本   | string          | — | — |
| disabled      | 禁用            | boolean         | — | false   |
| value-key | 输入建议对象中用于显示的键名 | string | — | value |
| value         | 必填值，输入绑定值   | string  | — | — |
| debounce      | 获取输入建议的去抖延时 | number         | — | 300 |
| placement     | 菜单弹出位置 | string         | top / top-start / top-end / bottom / bottom-start / bottom-end | bottom-start |
| fetch-suggestions | 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它  | Function(queryString, callback)  | — | — |
| popper-class | Autocomplete 下拉列表的类名 | string | — | — |
| trigger-on-focus | 是否在输入框 focus 时显示建议列表 | boolean | — | true |
| name | 原生属性 | string | — | — |
| select-when-unmatched | 在输入没有任何匹配建议的情况下，按下回车是否触发 `select` 事件 | boolean | — | false |
| label | 输入框关联的label文字 | string | — | — |
| prefix-icon | 输入框头部图标 | string | — | — |
| suffix-icon | 输入框尾部图标 | string | — | — |
| hide-loading | 是否隐藏远程加载时的加载图标 | boolean | — | false |
| popper-append-to-body | 是否将下拉列表插入至 body 元素。在下拉列表的定位出现问题时，可将该属性设置为 false | boolean | - | true |
| highlight-first-item | 是否默认突出显示远程搜索建议中的第一项 | boolean | — | false |

### Autocomplete Slots
| name | 说明 |
|------|--------|
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append | 输入框后置内容 |

### Autocomplete Scoped Slot
| name | 说明 |
|------|--------|
| — | 自定义输入建议，参数为 { item } |

### Autocomplete Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| select | 点击选中建议项时触发 | 选中建议项 |
| change | 在 Input 值改变时触发 | (value: string \| number) |

### Autocomplete Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |
