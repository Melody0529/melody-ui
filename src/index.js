import Scrollbar from '../packages/scrollbar/index.js'
import Row from '../packages/row/index.js'
import Col from '../packages/col/index.js'
import Container from '../packages/container/index.js'
import Header from '../packages/header/index.js'
import Aside from '../packages/aside/index.js'
import Main from '../packages/main/index.js'
import Footer from '../packages/footer/index.js'
import Tooltip from '../packages/tooltip/index.js'
import Icon from '../packages/icon/index.js'
import Button from '../packages/button/index.js'
import ButtonGroup from '../packages/button-group/index.js'
import Link from '../packages/link/index.js'
import CollapseTransition from 'melody-ui/src/transitions/collapse-transition'
const components = [Scrollbar, Row, Col, Container, Header, Aside, Main, Footer, Tooltip, Icon, Button, ButtonGroup, Link, CollapseTransition]

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
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Tooltip,
    Icon,
    Button,
    ButtonGroup,
    Link,
    CollapseTransition
}
