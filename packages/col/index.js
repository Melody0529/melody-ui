import MCol from './src/col'

/* istanbul ignore next */
MCol.install = function (Vue) {
    Vue.component(MCol.name, MCol)
}

export default MCol
