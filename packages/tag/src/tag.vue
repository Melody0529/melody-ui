<template>
    <transition name="m-zoom-in-center">
        <span
            class="m-tag"
            :class="[
                type ? `m-tag--${type}` : '',
                tagSize ? `m-tag--${tagSize}` : '',
                effect ? `m-tag--${effect}` : '',
                hit && 'is-hit'
            ]"
            :style="{ backgroundColor: color }"
            v-if="$slots.default"
            @click="handleClick">
            <slot></slot>
            <i v-if="closable" class="m-tag__close m-icon-close" @click="handleChange"></i>
        </span>
    </transition>
</template>

<script>
export default {
    name: 'MTag',
    props: {
        text: String,
        closable: Boolean,
        type: String,
        hit: Boolean,
        disableTransitions: Boolean,
        color: String,
        size: String,
        effect: {
            type: String,
            default: 'light',
            validator(val) {
                return ['dark', 'light', 'plain'].indexOf(val) !== -1
            }
        }
    },
    computed: {
        tagSize() {
            return this.size
        }
    },
    methods: {
        handleClick(event) {
            this.$emit('click', event)
        },
        handleChange(event) {
            event.stopPropagation()
            this.$emit('close', event)
        }
    }
}
</script>
