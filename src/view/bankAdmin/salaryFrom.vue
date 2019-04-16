<template>
  <div>
    <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import { salaryStatistic } from '@/api/zjjAdmin/salaryFrom'
import clickImg from '_c/clickImg'
export default({
  components: {
    editableTables,
    clickImg
  },
  data () {
    return {
      columns: [
        {
          title: '单位名称',
          key: 'deptName'
        },
        {
          title: '项目名称',
          key: 'projectName'
        },
        {
          title: '项目负责人电话',
          key: 'chargePhone'
        },
        {
          title: '月份',
          key: 'month'
        },
        {
          title: '项目类型',
          key: 'projectType'
        },
        {
          title: '总工资',
          key: 'allSalary'
        },
        {
          title: '投资规模',
          key: 'investSize'
        }
      ],
      // 基本参数
      dataList: [],
      // 查询参数
      selectValue: '',
      // 分页参数
      pageNum: 1,
      pageTotal: 1
      // 需求参数
    }
  },
  methods: {
    // 分页查询管理员
    getList () {
      this.dataList = []
      salaryStatistic(this.pageNum, this.selectValue).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        this.dataList.push(...res.info.data)
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    // 得到页数
    getPageNum (e) {
      this.pageNum = e
      this.getList()
    },
    // 复位
    restoration () {
      this.pageNum = 1
    },
    getSalaryList () {

    }
  },
  mounted () {
    // 初始化管理员列表
    this.getList()
  }
})
</script>
<style>
</style>
