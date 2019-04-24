<!-- 级联动 -->
<template>
    <Cascader @on-change='getSiteDate' :data="data" v-model="value" :load-data="loadData" style="width: 200px;display: inline-block; z-index: 9999"></Cascader>
</template>
<script>
import { getAreaCodeList } from '@/api/components/siteSelect'
export default {
  data () {
    return {
      data: []
    }
  },
  props: {
    value: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    loadData (item, callback) {
      item.loading = true
      getAreaCodeList(item.value).then(res => {
        // 获取字段位置
        let lengthValue = res.info[0].id.length - 2
        let compare = res.info[0].id.substring(lengthValue, res.info[0].id.length)
        if (compare + '' !== '00') {
          res.info.forEach(itemData => {
            item.children.push({
              value: itemData.id,
              label: itemData.name
            })
          })
          item.loading = false
          callback()
        } else {
          res.info.forEach(itemData => {
            item.children.push({
              value: itemData.id,
              label: itemData.name,
              children: [],
              loading: false
            })
          })
          item.loading = false
          callback()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getSiteDate (e) {
      this.$emit('input', e)
    },
    getAreaCode () {
      this.data = []
      getAreaCodeList().then(res => {
        this.data = []
        res.info.forEach(item => {
          this.data.push({
            value: item.id,
            label: item.name,
            children: [],
            loading: false
          })
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getAreaCode()
  },
  watch: {

  }
}
</script>
<style>
</style>
