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
import Radio from '../packages/radio/index.js'
import RadioGroup from '../packages/radio-group/index.js'
import RadioButton from '../packages/radio-button/index.js'
import Checkbox from '../packages/checkbox/index.js'
import CheckboxGroup from '../packages/checkbox-group/index.js'
import CheckboxButton from '../packages/checkbox-button/index.js'
import Input from '../packages/input/index.js'
import InputNumber from '../packages/input-number/index.js'
import Select from '../packages/select/index.js'
import Option from '../packages/option/index.js'
import OptionGroup from '../packages/option-group/index.js'
import Tag from '../packages/tag/index.js'
import Switch from '../packages/switch/index.js'
import Cascader from '../packages/cascader/index.js'
import CascaderPanel from '../packages/cascader-panel/index.js'
import Slider from '../packages/slider/index.js'
import DatePicker from '../packages/date-picker/index.js'
import TimeSelect from '../packages/time-select/index.js'
import TimePicker from '../packages/time-picker/index.js'
import Rate from '../packages/rate/index.js'
const components = [
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
    CollapseTransition,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxGroup,
    CheckboxButton,
    Input,
    InputNumber,
    Select,
    Option,
    OptionGroup,
    Tag,
    Switch,
    Cascader,
    CascaderPanel,
    Slider,
    DatePicker,
    TimeSelect,
    TimePicker,
    Rate
]

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
    CollapseTransition,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxGroup,
    CheckboxButton,
    Input,
    InputNumber,
    Select,
    Option,
    OptionGroup,
    Tag,
    Switch,
    Cascader,
    CascaderPanel,
    Slider,
    DatePicker,
    TimeSelect,
    TimePicker,
    Rate
}
