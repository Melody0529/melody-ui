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
    .m-header,
    .m-footer {
        background-color: #b3c0d1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .m-aside {
        background-color: #d3dce6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .m-main {
        background-color: #e9eef3;
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

### 实例

<!-- :::demo

```html
<m-container style="height: 500px; border: 1px solid #eee">
    <m-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <m-menu :default-openeds="['1', '3']">
            <m-submenu index="1">
                <template slot="title"><i class="m-icon-message"></i>导航一</template>
                <m-menu-item-group>
                    <template slot="title">分组一</template>
                    <m-menu-item index="1-1">选项1</m-menu-item>
                    <m-menu-item index="1-2">选项2</m-menu-item>
                </m-menu-item-group>
                <m-menu-item-group title="分组2">
                    <m-menu-item index="1-3">选项3</m-menu-item>
                </m-menu-item-group>
                <m-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <m-menu-item index="1-4-1">选项4-1</m-menu-item>
                </m-submenu>
            </m-submenu>
            <m-submenu index="2">
                <template slot="title"><i class="m-icon-menu"></i>导航二</template>
                <m-menu-item-group>
                    <template slot="title">分组一</template>
                    <m-menu-item index="2-1">选项1</m-menu-item>
                    <m-menu-item index="2-2">选项2</m-menu-item>
                </m-menu-item-group>
                <m-menu-item-group title="分组2">
                    <m-menu-item index="2-3">选项3</m-menu-item>
                </m-menu-item-group>
                <m-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <m-menu-item index="2-4-1">选项4-1</m-menu-item>
                </m-submenu>
            </m-submenu>
            <m-submenu index="3">
                <template slot="title"><i class="m-icon-setting"></i>导航三</template>
                <m-menu-item-group>
                    <template slot="title">分组一</template>
                    <m-menu-item index="3-1">选项1</m-menu-item>
                    <m-menu-item index="3-2">选项2</m-menu-item>
                </m-menu-item-group>
                <m-menu-item-group title="分组2">
                    <m-menu-item index="3-3">选项3</m-menu-item>
                </m-menu-item-group>
                <m-submenu index="3-4">
                    <template slot="title">选项4</template>
                    <m-menu-item index="3-4-1">选项4-1</m-menu-item>
                </m-submenu>
            </m-submenu>
        </m-menu>
    </m-aside>

    <m-container>
        <m-header style="text-align: right; font-size: 12px">
            <m-dropdown>
                <i class="m-icon-setting" style="margin-right: 15px"></i>
                <m-dropdown-menu slot="dropdown">
                    <m-dropdown-item>查看</m-dropdown-item>
                    <m-dropdown-item>新增</m-dropdown-item>
                    <m-dropdown-item>删除</m-dropdown-item>
                </m-dropdown-menu>
            </m-dropdown>
            <span>王小虎</span>
        </m-header>

        <m-main>
            <m-table :data="tableData">
                <m-table-column prop="date" label="日期" width="140"> </m-table-column>
                <m-table-column prop="name" label="姓名" width="120"> </m-table-column>
                <m-table-column prop="address" label="地址"> </m-table-column>
            </m-table>
        </m-main>
    </m-container>
</m-container>

<style>
    .m-header {
        background-color: #b3c0d1;
        color: #333;
        line-height: 60px;
    }

    .m-aside {
        color: #333;
    }
</style>

<script>
    export default {
        data() {
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }
            return {
                tableData: Array(20).fill(item)
            }
        }
    }
</script>
```

::: -->

### Container Attributes

| 参数      | 说明             | 类型   | 可选值                | 默认值                                                               |
| --------- | ---------------- | ------ | --------------------- | -------------------------------------------------------------------- |
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `m-header` 或 `m-footer` 时为 vertical，否则为 horizontal |

### Header Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 顶栏高度 | string | —      | 60px   |

### Aside Attributes

| 参数  | 说明       | 类型   | 可选值 | 默认值 |
| ----- | ---------- | ------ | ------ | ------ |
| width | 侧边栏宽度 | string | —      | 300px  |

### Footer Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 底栏高度 | string | —      | 60px   |
