<template>
    <label
        class="m-radio"
        role="radio"
        :class="[
            border && radioSize ? 'm-radio--' + radioSize : '',
            { 'is-disabled': isDisabled },
            { 'is-focus': focus },
            { 'is-bordered': border },
            { 'is-checked': model === label }
        ]"
        :aria-checked="model === label"
        :aria-disabled="isDisabled"
        :tabindex="tabIndex"
        @keydown.space.stop.prevent="model = isDisabled ? model : label">
        <span 
            class="m-radio__input"
            :class="[
                { 'is-checked': model === label },
                { 'is-disabled': isDisabled }
            ]">
            <span class="m-radio__inner"></span>
            <input
                ref="radio"
                class="m-radio__original"
                :value="label"
                type="radio"
                aria-hidden="true"
                v-model="model"
                @change="handleChange"
                @focus="focus = true"
                @blur="focus = false"
                :name="name"
                :disabled="isDisabled"
                tabindex="-1">    
        </span>
        <span class="m-radio__label" @keydown.stop>
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
import Emitter from 'melody-ui/src/mixins/emitter'
export default {
    name: 'MRadio',
    componentName: 'MRadio',
    mixins: [ Emitter ],
    props: {
        value: {},
        label: {},
        disabled: Boolean,
        border: Boolean,
        size: String,
        name: String
    },
    data() {
        return {
            focus: false
        }
    },
    computed: {
        isGroup() {
            let parent = this.$parent
            while (parent) {
                if(parent.$options.componentName !== 'MRadioGroup') {
                    parent = parent.$parent
                } else {
                    this._radioGroup = parent
                    return true
                }
            }
            return false
        },
        model: {
            get() {
                return this.isGroup ? this._radioGroup.value : this.value
            },
            set(val) {
                if(this.isGroup) {
                    this.dispatch('MRadioGroup', 'input', [val])
                } else {
                    this.$emit('input', val)
                }
                this.$refs.radio && (this.$refs.radio.checked = this.model === this.label)
            }
        },
        radioSize() {
            const temRadioSize = this.size
            return this.isGroup ? this._radioGroup.radioGroupSize || temRadioSize : temRadioSize
        },
        isDisabled() {
            return this.isGroup
                ? this._radioGroup.disabled || this.disabled 
                : this.disabled
        },
        tabIndex() {
            return (this.isDisabled || (this.isGroup && this.model !== this.label)) ? -1 : 0
        }
    },
    methods: {
        handleChange() {
            this.$nextTick(() => {
                this.$emit('change', this.model)
                this.isGroup && this.dispatch('MRadioGroup', 'handleChange', this.model)
            })
        }
    }
}
</script>