import Scrollbar from '../packages/scrollbar/index.js'
const components = [Scrollbar]

const install = function (Vue, opts = {}) {
    if (install.installed) return
    components.map((component) => Vue.component(component.name, component))
    Vue.prototype.$MELODYUI = {
        size: opts.size || '',
        zIndex: opts.zIndex || 2000
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    Scrollbar
}
