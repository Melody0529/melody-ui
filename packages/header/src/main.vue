<template>
    <header class="m-header" :style="{ height }">
        <slot></slot>
    </header>
</template>

<script>
export default {
    name: 'MHeader',
    componentName: 'MHeader',
    props: {
        height: {
            type: String,
            default: '60px'
        }
    }
}
</script>
