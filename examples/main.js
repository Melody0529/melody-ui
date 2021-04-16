// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import MUI from '@src/index'
import hljs from 'highlight.js'
import routes from './route.config'
import demoBlock from './components/demo-block'
import MainFooter from './components/footer'
import MainHeader from './components/header'
import SideNav from './components/side-nav'
import FooterNav from './components/footer-nav'
import title from './i18n/title'

import '../packages/theme-chalk/src/index.scss'
import './demo-styles/index.scss'
import './assets/styles/common.scss'
import './assets/styles/fonts/style.scss'
import icon from './icon.json'

Vue.use(MUI)
Vue.use(VueRouter)
Vue.component('demo-block', demoBlock)
Vue.component('main-footer', MainFooter)
Vue.component('main-header', MainHeader)
Vue.component('side-nav', SideNav)
Vue.component('footer-nav', FooterNav)

Vue.prototype.$icon = icon // Icon 列表页用

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes
})

router.afterEach((route) => {
    // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
    Vue.nextTick(() => {
        const blocks = document.querySelectorAll('pre code:not(.hljs)')
        Array.prototype.forEach.call(blocks, hljs.highlightBlock)
    })
    const data = title[route.meta.lang]
    for (let val in data) {
        if (new RegExp('^' + val, 'g').test(route.name)) {
            document.title = data[val]
            return
        }
    }
    document.title = 'MelodyUI'
    ga('send', 'event', 'PageView', route.name)
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: (h) => h(App)
})
