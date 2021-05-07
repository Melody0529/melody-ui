<template>
    <button 
        class="m-button"
        @click="handleClick">
        <span><slot></slot></span>
    </button>
</template>

<script>
export default {
    name: 'MButton',
    methods: {
        handleClick(evt) {
            this.$emit('click', evt)
        }
    }

}
</script>