<style lang="scss" scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 80px);
}
</style>
<template>
    <div class="main">
        <span>主页面</span>
    </div>
</template>
<script>
import { throttle } from 'throttle-debounce'

export default {
    created() {
        this.throttledHandleScroll = throttle(10, true, (index) => {
            this.handleScroll(index)
        })
    },
    methods: {
        handleScroll(index) {
            const ele = this.$refs.indexMainImg
            const rect = ele.getBoundingClientRect()
            const eleHeight = ele.clientHeight + 55
            let calHeight = (180 - rect.top) * 2
            if (calHeight < 0) calHeight = 0
            if (calHeight > eleHeight) calHeight = eleHeight
            this.mainImgOffset = calHeight
        }
    },
    data() {
        return {
            lang: this.$route.meta.lang,
            mainImgOffset: 0
        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.throttledHandleScroll)
    },
    mounted() {
        window.addEventListener('scroll', this.throttledHandleScroll)
    }
}
</script>
