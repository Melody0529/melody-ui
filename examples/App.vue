<template>
    <div id="app" :class="{ 'is-component': isComponent }">
        <main-header v-if="lang !== 'play'"></main-header>
        <div class="main-cnt">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { use } from '@src/locale'
import zhLocale from '@src/locale/lang/zh-CN'

const lang = location.hash.replace('#', '').split('/')[1] || 'zh-CN'
const localize = (lang) => {
    use(zhLocale)
}
localize(lang)

export default {
    name: 'app',
    computed: {
        lang() {
            return this.$route.path.split('/')[1] || 'zh-CN'
        },
        isComponent() {
            return /^component-/.test(this.$route.name || '')
        }
    },
    data() {
        return {
            isIndex: true
        }
    },
    watch: {
        lang(val) {
            if (val === 'zh-CN') {
                // this.suggestJump()
            }
            localize(val)
        }
    },

    methods: {
        suggestJump() {
            if (process.env.NODE_ENV !== 'production') return

            const href = location.href
            const preferGithub = localStorage.getItem('PREFER_GITHUB')
            const cnHref = href.indexOf('eleme.cn') > -1 || href.indexOf('element-cn') > -1 || href.indexOf('element.faas') > -1
            if (cnHref || preferGithub) return
            setTimeout(() => {
                if (this.lang !== 'zh-CN') return
                this.$confirm('建议大陆用户访问部署在国内的站点，是否跳转？', '提示')
                    .then(() => {
                        location.replace('https://element.eleme.cn')
                    })
                    .catch(() => {
                        localStorage.setItem('PREFER_GITHUB', 'true')
                    })
            }, 1000)
        }
    },
    mounted() {
        localize(this.lang)
        if (this.lang === 'zh-CN') {
            // this.suggestJump()
        }
        console.log(process)
    }
}
</script>
