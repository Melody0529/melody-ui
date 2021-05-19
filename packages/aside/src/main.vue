<template>
    <aside class="m-aside" :style="{ width }">
        <slot></slot>
    </aside>
</template>

<script>
export default {
name: 'MAside',

    componentName: 'MAside',

    props: {
        width: {
            type: String,
            default: '300px'
        }
    }
}
</script>
