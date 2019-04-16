<template>
    <div style="width: 100%">
      <Button type="text" @click="clickPrimary = !clickPrimary" style="color: #2b85e4">高级筛选
        <Icon type="ios-arrow-down" :style="{transform:`rotate(${degValue}deg)`}" class="arrows" />
      </Button>
      <slot></slot>
      <div :style="{height: `${heightValue}px`}" class="showClass">
        <div ref="allHeight" >

          <div class="wrap-div">
            <div class="main-left">
              项目编号：
            </div>
            <div class="main-right">
              <selectProjectName @sendValue="getValueObj"></selectProjectName>
            </div>
          </div>

          <div class="wrap-div">
            <div class="main-left">
              投资主体：
            </div>
            <div class="main-right">
              <select-state @sendValue="getValueObj"></select-state>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>
<script>
import './main.less'
// 上，下线状态
import selectState from './components/prorjectState.vue'
// 项目名称
import selectProjectName from './components/selectProjectNum.vue'

export default ({
  components: {
    selectState,
    selectProjectName
  },
  data () {
    return {
      clickPrimary: false,
      heightValue: 0,
      degValue: 0,
      sendList: [],
      mapList: new Map()
    }
  },
  methods: {
    getValueObj (e) {
      for (let key in e) {
        this.mapList.set(key, e[key])
      }
      this.sendList = []
      this.mapList.forEach((value, key, map) => {
        this.sendList.push({
          [key]: value
        })
      })
      console.log('sssssssssss')
      this.$emit('sendDataList', this.sendList)
    }
  },
  watch: {
    'clickPrimary' (e) {
      if (e) {
        this.heightValue = this.$refs.allHeight.getBoundingClientRect().height
        this.degValue = -180
      } else {
        this.heightValue = 0
        this.degValue = 0
      }
    }
  }
})
</script>
<style>

</style>
