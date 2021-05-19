<template>
    <button 
        class="m-button"
        @click="handleClick"
        :disabled="buttonDisabled || loading"
        :autofocus="autofocus"
        :type="nativeType"
        :class="[
            type? 'm-button--' + type : '',
            buttonSize ? 'm-button--' + buttonSize : '',
            {
                'is-disabled': buttonDisabled,
                'is-plain': plain,
                'is-round': round,
                'is-circle': circle,
                'is-loading': loading
            }
        ]">
        <i class="m-icon-loading" v-if="loading"></i>
        <i :class="icon" v-if="icon && !loading"></i>
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script>
export default {
    name: 'MButton',
    props: {
        type: {
            type: String,
            default: 'default'
        },
        icon: {
            type: String,
            default: ''
        },
        size: String,
        nativeType: {
            type: String,
            default: 'button'
        },
        plain: Boolean,
        round: Boolean,
        circle: Boolean,
        loading: Boolean,
        disabled: Boolean,
        autofocus: Boolean
    },
    computed: {
        buttonSize() {
            return this.size
        },
        buttonDisabled() {
            return  this.disabled
        }
    },
    methods: {
        handleClick(evt) {
            this.$emit('click', evt)
        }
    }

}
</script>