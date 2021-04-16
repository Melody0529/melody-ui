<script>
    import bus from '../../bus'
    import { ACTION_USER_CONFIG_UPDATE } from '../../components/theme/constant.js'
    const varMap = [
        '$--font-size-extra-large',
        '$--font-size-large',
        '$--font-size-medium',
        '$--font-size-base',
        '$--font-size-small',
        '$--font-size-extra-small'
    ]
    const original = {
        'font_size_extra_large': '20px',
        'font_size_large': '18px',
        'font_size_medium': '16px',
        'font_size_base': '14px',
        'font_size_small': '13px',
        'font_size_extra_small': '12px'
    }
    export default {
        created() {
        bus.$on(ACTION_USER_CONFIG_UPDATE, this.setGlobal);
        },
        mounted() {
        this.setGlobal();
        },
        methods: {
            tintColor(color, tint) {
                return tintColor(color, tint);
            },
            setGlobal() {
                if (window.userThemeConfig) {
                    this.global = window.userThemeConfig.global;
                }
            }
        },
        data() {
            return {
                global: {},
                    'font_size_extra_large': '',
                    'font_size_large': '',
                    'font_size_medium': '',
                    'font_size_base': '',
                    'font_size_small': '',
                    'font_size_extra_small': ''
                }
        },
        watch: {
            global: {
                immediate: true,
                handler(value) {
                    varMap.forEach((v) => {
                        const key = v.replace('$--', '').replace(/-/g, '_')
                        if (value[v]) {
                            this[key] = value[v]
                        } else {
                            this[key] = original[key]
                        }
                    })
                }
            }
        }
  }
</script>

## Typographie

Nous avons créé une convention de police d'écriture afin d'assurer la meilleur présentation possible sur toutes le plateformes.

### Police

<div class="demo-term-box">
    <img src="../../assets/images/term-pingfang.png" alt="">
    <img src="../../assets/images/term-hiragino.png" alt="">
    <img src="../../assets/images/term-microsoft.png" alt="">
    <img src="../../assets/images/term-sf.png" alt="">
    <img src="../../assets/images/term-helvetica.png" alt="">
    <img src="../../assets/images/term-arial.png" alt="">
</div>

### 字号

### 行高

<div>
    <img class="lineH-left" src="../../assets/images/typography.png" />
    <ul class="lineH-right">
        <li>line-height:1 <span>无行高</span></li>
        <li>line-height:1.3 <span>紧凑</span></li>
        <li>line-height:1.5 <span>常规</span></li>
        <li>line-height:1.7 <span>宽松</span></li>
    </ul>
</div>

### Font-family 代码

```css
font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
```
