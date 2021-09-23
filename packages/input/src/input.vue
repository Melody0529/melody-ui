<template>
    <div :class="[
        type === 'textarea' ? 'm-textarea' : 'm-input',
        inputSize ? 'm-input--' + inputSize : '',
        {
            'is-disabled': inputDisabled,
            'm-input--prefix': $slots.prefix || prefixIcon ,
            'm-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
        }]"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false">
        <template v-if="type!=='textarea'">
            <input
                :tabindex="tabindex"
                v-if="type!=='textarea'"
                class="m-input__inner"
                v-bind="$attrs"
                :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
                :disabled="inputDisabled"
                :readonly="readonly"
                :autocomplete="autoComplete || autocomplete"
                ref="input"
                @compositionstart="handleCompositionStart"
                @compositionupdate="handleCompositionUpdate"
                @compositionend="handleCompositionEnd"
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
            <span
                class="m-input__suffix"
                v-if="getSuffixVisible()">
                <span class="m-input__suffix-inner">
                    <template v-if="!showClear || !showPwdVisible">
                        <slot name="suffix"></slot>
                        <i class="m-input__icon"
                            v-if="suffixIcon"
                            :class="suffixIcon">
                        </i>
                    </template>
                    <i
                        v-if="showClear"
                        class="m-input__icon m-icon-close-circle m-input__clear"
                        @mousedown.prevent
                        @click="clear">
                    </i>
                    <i
                        v-if="showPwdVisible"
                        class="m-input__icon m-icon-eye m-input__clear"
                        @mousedown.prevent
                        @click="handlePasswordVisible">
                    </i>
                </span>
            </span>
        </template>
        <textarea
            v-else
            :tabindex="tabindex"
            class="m-textarea__inner"
            @compositionstart="handleCompositionStart"
            @compositionupdate="handleCompositionUpdate"
            @compositionend="handleCompositionEnd"
            @input="handleInput"
            ref="textarea"
            v-bind="$attrs"
            :disabled="inputDisabled"
            :readonly="readonly"
            :autocomplete="autoComplete || autocomplete"
            :style="textareaStyle"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            :aria-label="label">
    </textarea>
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
        form: String,
        disabled: Boolean,
        readonly: Boolean,
        type: {
            type: String,
            default: 'text'
        },
        autosize: {
            type: [Boolean, Object],
            default: false
        },
        autocomplete: {
            type: String,
            default: 'off'
        },
        /** @Deprecated in next major version */
        autoComplete: {
            type: String,
            validator(val) {
                process.env.NODE_ENV !== 'production' &&
            console.warn('[Element Warn][Input]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.')
                return true
            }
        },
        validateEvent: {
            type: Boolean,
            default: true
        },
        suffixIcon: String,
        prefixIcon: String,
        label: String,
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
        tabindex: String
    },
    data() {
        return {
            textareaCalcStyle: {},
            hovering: false,
            focused: false,
            isComposing: false,
            passwordVisible: false
        }
    },
    computed: {
        inputSize() {
            return this.size
        },
        inputDisabled() {
            return this.disabled
        },
        nativeInputValue() {
            return this.value === null || this.value === undefined ? '' : String(this.value)
        },
        showClear() {
            return this.clearable && this.nativeInputValue && (this.focused || this.hovering)
        },
        showPwdVisible() {
            return this.showPassword && (!!this.nativeInputValue || this.focused)
        },
        textareaStyle() {
            return merge({}, this.textareaCalcStyle, { resize: this.resize })
        }
    },
    methods: {
        focus() {
            this.getInput().focus()
        },
        blur() {
            this.getInput().blur()
        },
        select() {
            this.getInput().select()
        },
        getInput() {
            return this.$refs.input || this.$refs.textarea
        },
        handlePasswordVisible() {
            this.passwordVisible = !this.passwordVisible
            this.focus()
        },
        handleCompositionStart() {
            // this.isComposing = true
        },
        handleCompositionUpdate(event) {
            // const text = event.target.value
            // const lastCharacter = text[text.length - 1] || ''
            // this.isComposing = !isKorean(lastCharacter)
        },
        handleCompositionEnd(event) {
            // if (this.isComposing) {
            //     this.isComposing = false
            //     this.handleInput(event)
            // }
        },
        setNativeInputValue() {
            const input = this.getInput()
            if (!input) return
            if (input.value === this.nativeInputValue) return
            input.value = this.nativeInputValue
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
        handleInput(event) {
            console.log(event)
            // should not emit input during composition
            // see: https://github.com/ElemeFE/element/issues/10516
            if (this.isComposing) return

            // hack for https://github.com/ElemeFE/element/issues/8548
            // should remove the following line when we don't support IE
            if (event.target.value === this.nativeInputValue) return

            this.$emit('input', event.target.value)

            // ensure native input value is controlled
            // see: https://github.com/ElemeFE/element/issues/12850
            this.$nextTick(this.setNativeInputValue)
        },
        handleChange(event) {
            console.log(event)
            this.$emit('change', event.target.value)
        },
        handleBlur(event) {
            this.focused = false
            this.$emit('blur', event)
        },
        handleFocus(event) {
            this.focused = true
            this.$emit('focus', event)
        },
        clear() {
            this.$emit('input', '')
            this.$emit('change', '')
            this.$emit('clear')
        },
        getSuffixVisible() {
            return this.$slots.suffix ||
            this.suffixIcon ||
            this.showClear ||
            this.showPassword
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
            })
        }
    },
    created() {
        this.$on('inputSelect', this.select)
    },
    mounted() {
        this.setNativeInputValue()
        this.resizeTextarea()
    }
}
</script>
