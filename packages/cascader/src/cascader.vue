<template>
    <div
        ref="reference"
        :class="[
            'm-cascader',
            { 'is-disabled': isDisabled }
        ]"
        v-clickoutside="() => toggleDropDownVisible(false)"
        @mouseenter="inputHover = true"
        @mouseleave="inputHover = false"
        @click="() => toggleDropDownVisible(true)">
        <m-input
            ref="input"
            v-model="multiple ? presentText : inputValue"
            :placeholder="placeholder"
            :readonly="readonly"
            :disabled="isDisabled"
            :class="{ 'is-focus': dropDownVisible }">
            <template slot="suffix">
                <i
                    v-if="clearBtnVisible"
                    key="clear"
                    class="m-input__icon m-icon-close-circle"
                    @click.stop="handleClear">
                </i>
                <i
                    v-else
                    key="down"
                    :class="[
                        'm-input__icon',
                        'm-icon-down',
                        dropDownVisible && 'is-reverse'
                    ]"
                    @click.stop="toggleDropDownVisible()"></i>
            </template>
        </m-input>

        <div v-if="multiple" class="m-cascader__tags">
            <m-tag
                v-for="(tag, index) in presentTags"
                :key="tag.key"
                type="info"
                :size="tagSize"
                :hit="tag.hitState"
                :closable="tag.closable"
                disable-transitions
                @close="deleteTag(index)">
                <span>{{ tag.text }}</span>
            </m-tag>
        </div>

        <transition name="m-zoon-in-top">
            <div
                v-show="dropDownVisible"
                ref="popper"
                :class="['m-popper', 'm-cascader__dropdown', popperClass]">
                <m-cascader-panel
                    ref="panel"
                    v-model="checkedValue"
                    :options="options"
                    :props="config"
                    @expand-change="handleExpandChange"
                    @close="toggleDropDownVisible(false)">
                </m-cascader-panel>
            </div>
        </transition>
    </div>
</template>

<script>
import Popper from 'melody-ui/src/utils/vue-popper'
import Clickoutside from 'melody-ui/src/utils/clickoutside'
import Emitter from 'melody-ui/src/mixins/emitter'
import Locale from 'melody-ui/src/mixins/locale'
import Migrating from 'melody-ui/src/mixins/migrating'
import MInput from 'melody-ui/packages/input'
import MTag from 'melody-ui/packages/tag'
import MScrollbar from 'melody-ui/packages/scrollbar'
import MCascaderPanel from 'melody-ui/packages/cascader-panel'
import { t } from 'melody-ui/src/locale'
import { isEqual, isEmpty, kebabCase } from 'melody-ui/src/utils/util'
import { isUndefined, isFunction } from 'melody-ui/src/utils/types'
import { isDef } from 'melody-ui/src/utils/shared'
const MigratingProps = {
    expandTrigger: {
        newProp: 'expandTrigger',
        type: String
    },
    changeOnSelect: {
        newProp: 'checkStrictly',
        type: Boolean
    },
    hoverThreshold: {
        newProp: 'hoverThreshold',
        type: Number
    }
}

const PopperMixin = {
    props: {
        placement: {
            type: String,
            default: 'bottom-start'
        },
        appendToBody: Popper.props.appendToBody,
        visibleArrow: {
            type: Boolean,
            default: true
        },
        arrowOffset: Popper.props.arrowOffset,
        offset: Popper.props.offset,
        boundariesPadding: Popper.props.boundariesPadding,
        popperOptions: Popper.props.popperOptions
    },
    methods: Popper.methods,
    data: Popper.data,
    beforeDestroy: Popper.beforeDestroy
}

export default {
    name: 'MCascader',
    directives: { Clickoutside },
    mixins: [ PopperMixin, Emitter, Locale, Migrating ],
    components: {
        MInput,
        MTag,
        MScrollbar,
        MCascaderPanel
    },
    props: {
        value: {},
        options: Array,
        props: Object,
        size: String,
        placeholder: {
            type: String,
            default: () => t('el.cascader.placeholder')
        },
        disabled: Boolean,
        clearable: Boolean,
        filterable: Boolean,
        filterMethod: Function,
        separator: {
            type: String,
            default: ' / '
        },
        showAllLevels: {
            type: Boolean,
            default: true
        },
        collapseTags: Boolean,
        debounce: {
            type: Number,
            default: 300
        },
        beforeFilter: {
            type: Function,
            default: () => () => {}
        },
        popperClass: String
    },
    data() {
        return {
            dropDownVisible: false,
            checkedValue: this.value || null,
            inputHover: false,
            inputValue: null,
            presentText: null,
            presentTags: [],
            checkedNodes: [],
            filtering: false,
            suggestions: [],
            inputInitialHeight: 0,
            pressDeleteCount: 0
        }
    },
    computed: {
        realSize() {
            return this.size
        },
        tagSize() {
            return ['small', 'mini'].indexOf(this.realSize) > -1
                ? 'mini'
                : 'small'
        },
        isDisabled() {
            return this.disabled
        },
        config() {
            const config = this.props || {}
            const { $attrs } = this

            Object
                .keys(MigratingProps)
                .forEach(oldProp => {
                    const { newProp, type } = MigratingProps[oldProp]
                    let oldValue = $attrs[oldProp] || $attrs[kebabCase(oldProp)]
                    if (isDef(oldProp) && !isDef(config[newProp])) {
                        if (type === Boolean && oldValue === '') {
                            oldValue = true
                        }
                        config[newProp] = oldValue
                    }
                })

            return config
        },
        multiple() {
            return this.config.multiple
        },
        readonly() {
            return !this.filterable || this.multiple
        },
        clearBtnVisible() {
            if (!this.clearable || this.isDisabled || this.filtering || !this.inputHover) {
                return false
            }
            return this.multiple
                ? !!this.checkedNodes.filter(node => !node.isDisabled).length
                : !!this.presentText
        },
        panel() {
            return this.$refs.panel
        }
    },
    watch: {
        value(val) {
            if (!isEqual(val, this.checkedValue)) {
                this.checkedValue = val
                this.computePresentContent()
            }
        },
        checkedValue(val) {
            const { value, dropDownVisible } = this
            const { multiple } = this.config

            if (!isEqual(val, value) || isUndefined(value)) {
                this.computePresentContent()
                if (!multiple && dropDownVisible) {
                    this.toggleDropDownVisible(false)
                }

                this.$emit('input', val)
                this.$emit('change', val)
            }
        },
        presentText(val) {
            this.inputValue = val
        },
        presentTags(val, oldVal) {
            if (this.multiple && (val.length || oldVal.length)) {
                this.$nextTick(this.updateStyle)
            }
        },
        filtering(val) {
            this.$nextTick(this.updatePopper)
        }
    },
    mounted() {
    },
    beforeDestroy() {

    },
    methods: {
        toggleDropDownVisible(visible) {
            if (this.isDisabled) return

            this.dropDownVisible = visible
            this.updatePopper()
        },
        handleClear() {
            this.presentText = ''
            this.panel.clearCheckedNodes()
        },
        handleExpandChange(value) {
            this.$nextTick(this.updatePopper.bind(this))
            this.$emit('expand-change', value)
            this.$emit('active-item-change', value) // Deprecated
        },
        deleteTag(index) {

        },
        computePresentContent() {
            this.$nextTick(() => {
                if (this.config.multiple) {
                    this.computePresentTags()
                    this.presentText = this.presentTags.length ? ' ' : null
                } else {
                    this.computePresentText()
                }
            })
        },
        computePresentText() {
            const { checkedValue, config } = this
            if (!isEmpty(checkedValue)) {
                const node = this.panel.getNodeByValue(checkedValue)
                if (node && (config.checkStrictly || node.isLeaf)) {
                    this.presentText = node.getText(this.showAllLevels, this.separator)
                    return
                }
            }
            this.presentText = null
        },
        computePresentTags() {
            const { isDisabled, leafOnly, showAllLevels, separator, collapseTags } = this
            const checkedNodes = this.getCheckedNodes(leafOnly)
            console.log(checkedNodes)
            const tags = []

            const genTag = node => ({
                node,
                key: node.uid,
                text: node.getText(showAllLevels, separator),
                hitState: false,
                closable: !isDisabled && !node.isDisabled
            })

            if (checkedNodes.length) {
                const [first, ...rest] = checkedNodes
                const restCount = rest.length
                tags.push(genTag(first))

                if (restCount) {
                    if (collapseTags) {
                        tags.push({
                            key: -1,
                            text: `+ ${restCount}`,
                            closable: false
                        })
                    } else {
                        rest.forEach(node => tags.push(genTag(node)))
                    }
                }
            }

            this.checkedNodes = checkedNodes
            this.presentTags = tags
        },
        updateStyle() {
            const { $el, inputInitialHeight } = this
            if (this.$isServer || !$el) return

            const { suggestionPanel } = this.$refs
            const inputInner = $el.querySelector('.m-input__inner')

            if (!inputInner) return

            const tags = $el.querySelector('.m-cascader__tags')
            let suggestionPanelEl = null

            if (suggestionPanel && (suggestionPanelEl = suggestionPanel.$el)) {
                const suggestionList = suggestionPanelEl.querySelector('.m-cascader__suggestion-list')
                suggestionList.style.minWidth = inputInner.offsetWidth + 'px'
            }

            if (tags) {
                const { offsetHeight } = tags
                const height = Math.max(offsetHeight + 6, inputInitialHeight) + 'px'
                inputInner.style.height = height
                this.updatePopper()
            }
        },
        getCheckedNodes(leafOnly) {
            return this.panel.getCheckedNodes(leafOnly)
        }
    }
}
</script>
