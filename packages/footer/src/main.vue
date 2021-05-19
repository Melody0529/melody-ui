<template>
  <footer class="m-footer" :style="{ height }">
    <slot></slot>
  </footer>
</template>

<script>
export default {
    name: 'MFooter',

    componentName: 'MFooter',

    props: {
        height: {
            type: String,
            default: '60px'
        }
    }
}
</script>
