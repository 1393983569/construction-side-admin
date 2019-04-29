<template>
  <!-- 文化程度 -->
  <div>
    <Select v-model="catIdsValue" clearable @on-change="selectBox" style="width: 250px">
      <Option v-for="item in classfiyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
    </Select>
  </div>
</template>
<script>
  import {cultureLevelType} from '@/api/public'
  export default ({
    data() {
      return {
        classfiyList: [],
        catIdsValue: []
      }
    },
    methods: {
      selectBox(e) {
        this.$emit('sendValue', {
          cultureLevelType: e
        })
      }
    },
    mounted () {
      this.classfiyList = []
      cultureLevelType().then(res => {
        this.classfiyList = []
        console.log(res)
        res.info.map(item => {
          this.classfiyList.push({
            name: item.name,
            id: item.id
          })
        })
      }).catch(err => {

      })
    }
  })
</script>
<style>

</style>
