<template>
    <label
        class="m-checkbox"
        role="checkbox"
        :id="id"
        :class="[
            border && checkboxSize ? 'm-checkbox--' + checkboxSize : '',
            { 'is-checked': isChecked },
            { 'is-disabled': isDisabled },
            { 'is-bordered': border }
        ]">
        <span
            class="m-checkbox__input"
            :class="{
                'is-checked': isChecked,
                'is-disabled': isDisabled,
                'is-indeterminate': indeterminate,
                'is-focus': focus
            }"
            :tabindex="indeterminate ? 0 : false"
            :role="indeterminate ? 'checkbox' : false"
            :aria-checked="indeterminate ? 'mixed' : false">
            <span class="m-checkbox__inner"></span>
            <input
                v-if="trueLabel || falseLabel"
                type="checkbox"
                class="m-checkbox__original"
                :aria-hidden="indeterminate ? 'true' : 'false'"
                v-model="model"
                :name="name"
                :disabled="isDisabled"
                :true-value="trueLabel"
                :false-value="falseLabel"
                @change="handleChange"
                @focus="focus = true"
                @blur="focus = false">
            <input
                v-else
                type="checkbox"
                class="m-checkbox__original"
                :aria-hidden="indeterminate ? 'true' : 'false'"
                :disabled="isDisabled"
                :value="label"
                :name="name"
                v-model="model"
                @change="handleChange"
                @focus="focus = true"
                @blur="focus = false">
        </span>
        <span class="m-checkbox__label" v-if="$slots.default || label">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>
<script>
import Emitter from 'melody-ui/src/mixins/emitter'
export default {
    name: 'MCheckbox',
    componentName: 'MCheckbox',
    mixins: [Emitter],
    props: {
        value: {},
        label: {},
        disabled: Boolean,
        indeterminate: Boolean,
        trueLabel: [String, Number],
        falseLabel: [String, Number],
        border: Boolean,
        size: String,
        name: String,
        checked: Boolean,
        id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系 */
        controls: String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系 */
    },
    data() {
        return {
            selfModel: false,
            focus: false,
            isLimitExceeded: false
        }
    },
    computed: {
        model: {
            get() {
                return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel
            },
            set(val) {
                if (this.isGroup) {
                    this.isLimitExceeded = false
                    if (this._checkboxGroup.min !== undefined && val.length < this._checkboxGroup.min) {
                        this.isLimitExceeded = true
                    }
                    if (this._checkboxGroup.max !== undefined && val.length > this._checkboxGroup.max) {
                        this.isLimitExceeded = true
                    }
                    this.isLimitExceeded === false && this.dispatch('MCheckboxGroup', 'input', [val])
                } else {
                    this.$emit('input', val)
                    this.selfModel = val
                }
            }
        },
        isChecked() {
            if ({}.toString.call(this.model) === '[object Boolean]') {
                return this.model
            } else if (Array.isArray(this.model)) {
                return this.model.indexOf(this.label) > -1
            } else if (this.model !== null && this.model !== undefined) {
                return this.model === this.trueLabel
            }
        },
        isGroup() {
            let parent = this.$parent
            while (parent) {
                if (parent.$options.componentName !== 'MCheckboxGroup') {
                    parent = parent.$parent
                } else {
                    this._checkboxGroup = parent
                    return true
                }
            }
            return false
        },
        store() {
            return this._checkboxGroup ? this._checkboxGroup.value : this.value
        },
        isLimitDisabled() {
            const {max, min} = this._checkboxGroup
            return !!(max || min) && (this.model.length >= max && !this.isChecked) || (this.model.length <= min && this.isChecked)
        },
        isDisabled() {
            return this.isGroup ? this._checkboxGroup.disabled || this.disabled || this.isLimitDisabled : this.disabled
        },
        checkboxSize() {
            const temCheckboxSize = this.size
            return this.isGroup ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize : temCheckboxSize
        }
    },
    created() {
        this.checked && this.addToStore()
    },
    mounted() {
        if (this.indeterminate) {
            this.$el.setAttribute('aria-controls', this.controls)
        }
    },
    methods: {
        addToStore() {
            if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
                this.model.push(this.label)
            } else {
                this.model = this.trueLabel || true
            }
        },
        handleChange(ev) {
            if (this.isLimitExceeded) return
            let value
            if (ev.target.checked) {
                value = this.trueLabel === undefined ? true : this.trueLabel
            } else {
                value = this.falseLabel === undefined ? false : this.falseLabel
            }
            this.$emit('change', value)
            this.$nextTick(() => {
                if (this.isGroup) {
                    this.dispatch('MCheckboxGroup', 'change', [this._checkboxGroup.value])
                }
            })
        }
    }
}
</script>
