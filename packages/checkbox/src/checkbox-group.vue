<script>
import Emitter from 'melody-ui/src/mixins/emitter'

export default {
    name: 'MCheckboxGroup',

    componentName: 'MCheckboxGroup',

    mixins: [Emitter],

    inject: {
        mFormItem: {
            default: ''
        }
    },

    props: {
        value: {},
        disabled: Boolean,
        min: Number,
        max: Number,
        size: String,
        fill: String,
        textColor: String
    },

    computed: {
        _mFormItemSize() {
            return (this.mFormItem || {}).mFormItemSize
        },
        checkboxGroupSize() {
            return this.size || this._mFormItemSize || (this.$ELEMENT || {}).size
        }
    },

    watch: {
        value(value) {
            this.dispatch('MFormItem', 'el.form.change', [value])
        }
    }
}
</script>

<template>
    <div
        class="m-checkbox-group"
        role="group"
        aria-label="checkbox-group">
        <slot></slot>
    </div>
</template>
