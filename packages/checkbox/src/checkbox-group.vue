<template>
    <div
        class="m-checkbox-group"
        role="group"
        aria-label="checkbox-group">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'MCheckboxGroup',
    componentName: 'MCheckboxGroup',
    props: {
        value: {},
        disabled: false,
        min: Number,
        max: Number,
        textColor: String,
        size: String,
        fill: String
    },
    computed: {
        checkboxGroupSize() {
            return this.size
        }
    }
}
</script>