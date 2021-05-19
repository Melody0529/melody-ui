## Container 布局容器
用于布局的容器组件，方便快速搭建页面的基本结构：

`<m-container>`：外层容器。当子元素中包含 `<m-header>` 或 `<m-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<m-header>`：顶栏容器。

`<m-aside>`：侧边栏容器。

`<m-main>`：主要区域容器。

`<m-footer>`：底栏容器。

:::tip
以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<m-container>` 的子元素只能是后四者，后四者的父元素也只能是 `<m-container>`。
:::

### 常见页面布局

:::demo
```html
<m-container>
    <m-header>Header</m-header>
    <m-main>Main</m-main>
</m-container>

<m-container>
    <m-header>Header</m-header>
    <m-main>Main</m-main>
    <m-footer>Footer</m-footer>
</m-container>

<m-container>
    <m-aside width="200px">Aside</m-aside>
    <m-main>Main</m-main>
</m-container>

<m-container>
    <m-header>Header</m-header>
    <m-container>
        <m-aside width="200px">Aside</m-aside>
        <m-main>Main</m-main>
    </m-container>
</m-container>

<m-container>
    <m-header>Header</m-header>
    <m-container>
        <m-aside width="200px">Aside</m-aside>
        <m-container>
            <m-main>Main</m-main>
            <m-footer>Footer</m-footer>
        </m-container>
    </m-container>
</m-container>

<m-container>
    <m-aside width="200px">Aside</m-aside>
    <m-container>
        <m-header>Header</m-header>
        <m-main>Main</m-main>
    </m-container>
</m-container>

<m-container>
    <m-aside width="200px">Aside</m-aside>
    <m-container>
        <m-header>Header</m-header>
        <m-main>Main</m-main>
        <m-footer>Footer</m-footer>
    </m-container>
</m-container>

<style>
    .m-header, .m-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .m-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
  
    .m-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
  
    body > .m-container {
        margin-bottom: 40px;
    }
  
    .m-container:nth-child(5) .m-aside,
    .m-container:nth-child(6) .m-aside {
        line-height: 260px;
    }
  
    .m-container:nth-child(7) .m-aside {
        line-height: 320px;
    }
</style>
```
:::

### Container Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `m-header` 或 `m-footer` 时为 vertical，否则为 horizontal |

### Header Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 顶栏高度 | string | — | 60px |

### Aside Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| width | 侧边栏宽度 | string | — | 300px |

### Footer Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 底栏高度 | string | — | 60px |