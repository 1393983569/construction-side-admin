<template>
  <!-- 工种 -->
  <div>
    <Select v-model="catIdsValue" clearable @on-change="selectBox" style="width: 250px">
      <Option v-for="item in classfiyList" :value="item.workType" :key="item.workType">{{ item.workTypeName }}</Option>
    </Select>
  </div>
</template>
<script>
  import {workerType} from '@/api/public'
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
          workType: e
        })
      }
    },
    mounted () {
      this.classfiyList = []
      workerType().then(res => {
        this.classfiyList = []
        res.info.map(item => {
          this.classfiyList.push({
            workTypeName: item.profession,
            workType: item.tid
          })
        })
      }).catch(err => {

      })
    }
  })
</script>
<style>

</style>
