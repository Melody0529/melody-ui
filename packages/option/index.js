import MOption from '../select/src/option'

/* istanbul ignore next */
MOption.install = function (Vue) {
    Vue.component(MOption.name, MOption)
}

export default MOption
