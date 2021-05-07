import Scrollbar from '../packages/scrollbar/index.js'
import Row from '../packages/row/index.js'
import Col from '../packages/col/index.js'
import Tooltip from '../packages/tooltip/index.js'
import Button from '../packages/button/index.js'
import CollapseTransition from 'melody-ui/src/transitions/collapse-transition'
const components = [Scrollbar, Row, Col, Tooltip, Button, CollapseTransition]

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
    Scrollbar,
    Row,
    Col,
    Tooltip,
    Button,
    CollapseTransition
}
