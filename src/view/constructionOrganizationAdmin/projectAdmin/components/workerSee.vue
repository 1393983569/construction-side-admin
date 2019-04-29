<template>
  <div>
    <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import { trainQuery } from '@/api/constructionOrganizationAdmin/workerAdmin/trainSee'
import {aesDecrypt} from '@/libs/util'
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
          title: '姓名',
          key: 'workerName',
          render: (h, params) => {
            return h('div', params.row.workerDomain.workerName)
          }
        },
        {
          title: '是否合格',
          key: 'isPass',
          render: (h, params) => {
            return h('div', params.row.isPass + '' === '0' ? '否' : '是')
          }
        },
        {
          title: '成绩',
          key: 'trainingScore'
        },
        {
          title: '身份证',
          key: 'idCardNumber',
          render: (h, params) => {
            return h('div', aesDecrypt(params.row.idCardNumber))
          }
        }
      ],
      // 基本参数
      dataList: [],
      // 查询参数
      selectValue: '',
      // 分页参数
      pageNum: 1,
      pageTotal: 1,
      // 需求参数
    }
  },
  methods: {
    // 分页查询管理员
    getList (id) {
      this.dataList = []
      if (!id) return
      trainQuery(id).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        this.dataList.push(...res.info.workers)
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
      this.accountTitle = ''
      this.accountJob = ''
      this.pageNum = 1
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
