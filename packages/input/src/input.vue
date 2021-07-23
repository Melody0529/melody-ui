<template>
    <div :class="[
        type === 'textarea' ? 'm-textarea' : 'm-input',
        inputSize ? 'm-input--' + inputSize : '',
        {
            'is-disabled': inputDisabled,
            'is-exceed': inputExceed,
            'm-input-group': $slots.prepend || $slots.append,
            'm-input-group--append': $slots.append,
            'm-input-group--prepend': $slots.prepend,
            'm-input--prefix': $slots.prefix || prefixIcon,
            'm-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
        }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
        <template v-if="type!== 'textarea'">
            <!-- 前置元素 -->
           <div class="m-input-group__prepend" v-if="$slots.prepend">
                <slot name="prepend"></slot>
            </div>
            <input
                :tabindex="tabindex"
                v-if="type!== 'texterea'"
                class="m-input__inner"
                v-bind="$attrs"
                :type="showPassword ? (passwordVisible ? 'text':'password') : type"
                :autocomplete="autocomplete"
                :disabled="inputDisabled"
                :readonly="readonly"
                ref="input"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
                :aria-label="label">
            <!-- 前置内容 -->
            <span class="m-input__prefix" v-if="$slots.prefix || prefixIcon">
                <slot name="prefix"></slot>
                 <i class="m-input__icon"
                    v-if="prefixIcon"
                    :class="prefixIcon">
                </i>
            </span>
            <!-- 后置内容 -->
            <span class="m-input__suffix"
                v-if="getSuffixVisible()">
                <span class="m-input__suffix-inner">
                    <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
                        <slot name="suffix"></slot>
                        <i class="m-input__icon"
                            v-if="suffixIcon"
                            :class="suffixIcon">
                        </i>
                    </template>
                    <i v-if="showClear"
                        class="m-input__icon m-icon-close-circle m-input__clear"
                        @mousedown.prevent
                        @click="clear">
                    </i>
                     <i v-if="showPwdVisible"
                        class="m-input__icon m-icon-eye m-input__clear"
                        @mousedown.prevent
                        @click="handlePasswordVisible">
                    </i>
                    <span v-if="isWordLimitVisible" class="m-input__count">
                        <span class="m-input__count-inner">
                        {{ textLength }}/{{ upperLimit }}
                        </span>
                    </span>
                </span>

            </span>
            <!-- 后置元素 -->
            <div class="m-input-group__append" v-if="$slots.append">
                <slot name="append"></slot>
            </div>
        </template>
        <textarea v-else
            :tabindex="tabindex"
            class="m-textarea__inner"
            ref="textarea"
            v-bind="$attrs"
            :disabled="inputDisabled"
            :readonly="readonly"
            :style="textareaStyle"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            @input="handleInput"
            :aria-label="label">
        </textarea>
        <span v-if="isWordLimitVisible && type === 'textarea'" class="m-input__count">{{ textLength }}/{{ upperLimit }}</span>
    </div>
</template>

<script>
import calcTextareaHeight from './calcTextareaHeight'
import merge from 'melody-ui/src/utils/merge'
export default {
    name: 'MInput',
    componentName: 'MInput',
    props: {
        value: [String, Number],
        size: String,
        resize: String,
        type: {
            type: String,
            default: 'text'
        },
        autocomplete: {
            type: String,
            default: 'off'
        },
        disabled: Boolean,
        clearable: {
            type: Boolean,
            default: false
        },
        showPassword: {
            type: Boolean,
            default: false
        },
        showWordLimit: {
            type: Boolean,
            default: false
        },
        readonly: false,
        suffixIcon: String,
        prefixIcon: String,
        autosize: {
            type: [Boolean, Object],
            default: false
        },
        tabindex: String,
        label: String,
        form: String
    },
    data() {
        return {
            textareaCalcStyle: {},
            hovering: false,
            focused: false,
            passwordVisible: false
        }
    },
    computed: {
        inputDisabled() {
            return this.disabled
        },
        inputSize() {
            return this.size
        },
        nativeInputValue() {
            return this.value === null || this.value === undefined ? '' : String(this.value)
        },
        showClear() {
            return this.clearable &&
                !this.inputDisabled &&
                !this.readonly &&
                this.nativeInputValue &&
                (this.focused || this.hovering)
        },
        showPwdVisible() {
            return this.showPassword &&
            !this.inputDisabled &&
            !this.readonly &&
            (!!this.nativeInputValue || this.focused)
        },
        isWordLimitVisible() {
            return this.showWordLimit &&
                this.$attrs.maxlength &&
                (this.type === 'text' || this.type === 'textarea') &&
                !this.inputDisabled &&
                !this.readonly &&
                !this.showPassword
        },
        textareaStyle() {
            console.log(this.resize)
            console.log(merge({}, this.textareaCalcStyle, { resize: this.resize }))
            return merge({}, this.textareaCalcStyle, { resize: this.resize })
        },
        upperLimit() {
            console.log(this.$attrs)
            return this.$attrs.maxlength
        },
        textLength() {
            if (typeof this.value === 'number') {
                return String(this.value).length
            }

            return (this.value || '').length
        },
        inputExceed() {
        // show exceed style if length of initial value greater then maxlength
            return this.isWordLimitVisible &&
          (this.textLength > this.upperLimit)
        }
    },
    methods: {
        focus() {
            this.getInput().focus()
        },
        blur() {
            this.getInput().blur()
        },
        clear() {
            this.$emit('input', '')
            this.$emit('change', '')
            this.$emit('clear')
        },
        handlePasswordVisible() {
            this.passwordVisible = !this.passwordVisible
            this.focus()
        },
        handleBlur(event) {
            this.focused = false
            this.$emit('blur', event)
        },
        handleFocus(event) {
            this.focused = true
            this.$emit('focus', event)
        },
        handleInput(event) {
            if (event.target.value === this.nativeInputValue) return
            this.$emit('input', event.target.value)
            this.$nextTick(this.setNativeInputValue)
        },
        handleChange(event) {
            this.$emit('change', event.target.value)
        },
        calcIconOffset(place) {

        },
        updateIconOffset() {
            this.calcIconOffset('prefix')
            this.calcIconOffset('suffix')
        },
        resizeTextarea() {
            if (this.$isServer) return
            const { autosize, type } = this
            if (type !== 'textarea') return
            if (!autosize) {
                this.textareaCalcStyle = {
                    minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
                }
                return
            }
            const minRows = autosize.minRows
            const maxRows = autosize.maxRows
            this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)
        },
        setNativeInputValue() {
            const input = this.getInput()
            if (!input) return
            if (input.value === this.nativeInputValue) return
            input.value = this.nativeInputValue
        },
        getInput() {
            return this.$refs.input || this.$refs.textarea
        },
        getSuffixVisible() {
            return this.$slots.suffix ||
                this.suffixIcon ||
                this.showClear ||
                this.showPassword ||
                this.isWordLimitVisible
        }
    },
    watch: {
        value(val) {
            this.$nextTick(this.resizeTextarea)
        },
        nativeInputValue() {
            this.setNativeInputValue()
        },
        type() {
            this.$nextTick(() => {
                this.setNativeInputValue()
                this.resizeTextarea()
                this.updateIconOffset()
            })
        }
    },
    mounted() {
        this.setNativeInputValue()
        this.resizeTextarea()
        this.updateIconOffset()
    },
    updated() {
        this.$nextTick(this.updateIconOffset)
    }
}
</script>
