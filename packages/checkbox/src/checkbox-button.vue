<template>
    <label
        class="m-checkbox-button"
        :class="[
            size ? 'm-checkbox-button--' + size : '',
            { 'is-disabled': isDisabled },
            { 'is-checked': isChecked },
            { 'is-focus': focus },
        ]"
        role="checkbox"
        :aria-checked="isChecked"
        :aria-disabled="isDisabled">
        <input
            v-if="trueLabel || falseLabel"
            class="m-checkbox-button__original"
            type="checkbox"
            :name="name"
            :disabled="isDisabled"
            :true-value="trueLabel"
            :false-value="falseLabel"
            v-model="model"
            @change="handleChange"
            @focus="focus = true"
            @blur="focus = false">
        <input
            v-else
            class="m-checkbox-button__original"
            type="checkbox"
            :name="name"
            :disabled="isDisabled"
            :value="label"
            v-model="model"
            @change="handleChange"
            @focus="focus = true"
            @blur="focus = false">

        <span class="m-checkbox-button__inner"
            v-if="$slots.default || label"
            :style="isChecked ? activeStyle : null">
            <slot>{{label}}</slot>
        </span>
    </label>
</template>
<script>
import Emitter from 'melody-ui/src/mixins/emitter'
export default {
    name: 'MCheckboxButton',
    componentName: 'MCheckboxButton',
    mixins: [Emitter],
    data() {
        return {
            selfModel: false,
            focus: false,
            isLimitExceeded: false
        }
    },
    props: {
        value: {},
        label: {},
        disabled: Boolean,
        checked: Boolean,
        name: String,
        trueLabel: [String, Number],
        falseLabel: [String, Number]
    },
    computed: {
        model: {
            get() {
                return this._checkboxGroup ? this.store : this.value !== undefined ? this.value: this.selfModel
            },
            set(val) {
                if (this._checkboxGroup) {
                    this.isLimitExceeded = false
                    if(this._checkboxGroup.min !== undefined &&val.length < this._checkboxGroup.min) {
                        this.isLimitExceeded = true
                    }
                    if(this._checkboxGroup.max !== undefined &&val.length > this._checkboxGroup.max) {
                        this.isLimitExceeded = true
                    }

                    this.isLimitExceeded === false &&
                    this.dispatch('MCheckboxGroup', 'input', [val])
                } else if (this.value !== undefined) {
                    this.$emit('input', val);
                } else {
                    this.selfModel = val;
                }
            }
        },
        isChecked() {
            if ({}.toString.call(this.model) === '[object Boolean]') {
                return this.model
            } else if (Array.isArray(this.model)) {
                return this.model.indexOf(this.label) > -1
            } else if(this.model !== null && this.model !== undefined) {
                return this.model === this.trueLabel
            }
        },
        _checkboxGroup() {
            let parent = this.$parent
            while(parent) {
                if(parent.$options.componentName != 'MCheckboxGroup') {
                    parent = parent.$parent
                } else {
                    return parent
                }
            }
            return false
        },
        store() {
            return this._checkboxGroup ? this._checkboxGroup.value : this.value
        },
        isLimitDisabled() {
            const { max, min } = this._checkboxGroup
            return !!(max || min) &&
                (this.model.length >= max && !this.isChecked) ||
                (this.model.length <= min && this.isChecked)
        },
        isDisabled() {
            return this._checkboxGroup
                ? this._checkboxGroup.disabled || this.disabled || this.isLimitDisabled
                : this.disabled
        },
        size() {
            return this._checkboxGroup.checkboxGroupSize
        }

    },
    methods: {
        addToStore() {
            if (Array.isArray(this.model) &&this.model.indexOf(this.label) === -1) {
                this.model.push(this.label);
            } else {
                this.model = this.trueLabel || true;
            }
        },
        handleChange(ev) {

        }

    },
    created() {
        this.checked && this.addToStore();
    }
}
</script>