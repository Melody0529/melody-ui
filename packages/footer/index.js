import Footer from './src/main'

/* istanbul ignore next */
Footer.install = function (Vue) {
    console.log(Footer)
    Vue.component(Footer.name, Footer)
}

export default Footer
