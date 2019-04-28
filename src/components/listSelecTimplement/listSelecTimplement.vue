<template>
  <!-- 多数据选择组件  返回 v-model -->
  <div class="box" :style="{width: widthData + 'px', height: heightData + 'px'}">
    <div class="box-header">
      <span style="float: left">
        {{title}}
      </span>
      <span style="float: right">
        {{newWorkerList.length}}
      </span>
    </div>
    <Input style="padding: 8px 10px 0 10px" @on-change="inputChange" search clearable placeholder="请输入搜索内容" />
    <div :style="{overflow: 'scroll', width: '100%', height: overflowHeight, 'padding': '5px 0 0 15px', overflowX: 'hidden'}">
      <div :key="index" v-for="(item, index) in newWorkerList">
        <Checkbox v-model="item.state" @on-change="checkboxChange($event, item.value, index)">{{item.data}}</Checkbox>
      </div>
    </div>
  </div>
</template>
<script>
import clonedeep from 'clonedeep'
export default({
  components: {

  },
  props: {
    widthData: {
      type: Number,
      default: 300
    },
    heightData: {
      type: Number,
      default: 360
    },
    title: {
      type: String,
      default: '数据列表'
    },
    workerList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // workerList: [
      //   {
      //     value: '87',
      //     data: '啊实打实大'
      //   },
      // ],
      newWorkerList: [],
      selectedList: []
    }
  },
  computed: {
    heightValue () {
      return `300px`
    },
    overflowHeight () {
      return this.heightData - 80 + 'px'
    }
  },
  methods: {
    // workerList
    checkboxChange (e, workerValue, indexs) {
      if (e) {
        // 添加选中
        this.selectedList.push(this.newWorkerList[indexs])
        // 添加选中状态
        this.workerList.forEach((item, index) => {
          if (workerValue === item.value) {
            this.workerList[index].state = true
          }
        })
      } else {
        // 移除选中
        this.selectedList.forEach((item, index) => {
          if (item.value === workerValue) {
            this.selectedList.splice(index, 1)
          }
        })
        // 移除选中状态
        this.workerList.forEach((item, index) => {
          if (workerValue === item.value) {
            this.workerList[index].state = false
          }
        })
      }
      this.$emit('input', this.selectedList)
    },
    inputChange (event) {
      const value = event.target.value
      const selectList = (item) => {
        return item.data.includes(value)
      }
      this.newWorkerList = clonedeep(this.workerList).filter(selectList)
    }
  },
  watch: {
    workerList () {
      this.newWorkerList = clonedeep(this.workerList)
    }
  }
})
</script>
<style scoped lang="less">
.box{
  // width: 300px;
  // height: 360px;
  border: 1px solid #d8d7d7;
  border-radius: 5px;
  margin-top: 10px;
  &-header{
    width: 100%;
    height: 36px;
    line-height: 36px;
    background-color: #f9fafc;
    border-radius: 5px 5px 0 0;
    padding: 0 20px;
    border-bottom: 1px solid #d8d7d7;
  }
}
</style>
