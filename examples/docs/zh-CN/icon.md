## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `el-icon-iconName` 来使用即可。例如：

:::demo
```html
<i class="m-icon-edit"></i>
<i class="m-icon-share"></i>
<i class="m-icon-delete"></i>
<m-button type="primary" icon="m-icon-search">搜索</m-button>

```
:::

### 图标集合

<ul class="icon-list">
  <li v-for="name in $icon" :key="name">
    <span>
      <i :class="'m-icon-' + name"></i>
      <span class="icon-name">{{'m-icon-' + name}}</span>
    </span>
  </li>
</ul>
