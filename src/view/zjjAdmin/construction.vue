<template>
  <div>
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    </div>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import { getPageListByDept } from '@/api/zjjAdmin/construction'
import clickImg from '_c/clickImg'
import './companyAdmin'
export default({
  components: {
    editableTables,
    clickImg
  },
  data () {
    return {
      columns: [
        {
          title: '项目名称',
          key: 'projectName'
        },
        {
          title: '施工单位',
          key: 'deptName',
          render: (h, params) => {
            return h('div', params.row.deptDomain.deptName)
          }
        },
        {
          title: '项目负责人姓名',
          key: 'chargeName'
        },
        {
          title: '项目负责人电话',
          key: 'chargePhone'
        },
        {
          title: '项目地址',
          key: 'projectAddr'
        },
        {
          title: '保证金提交状态',
          key: 'projectAddr',
          render: (h, params) => {
            return h('div', params.row.deptDomain.bondState + '' === '0' ? '未提交' : '已提交')
          }
        },
        {
          title: '工资支付金提交状态',
          key: 'projectAddr',
          render: (h, params) => {
            return h('div', params.row.deptDomain.grantState + '' === '0' ? '未提交' : '已提交')
          }
        },
        {
          title: '营业执照',
          key: 'allowPic',
          render: (h, params) => {
            return h('div', [
              h(clickImg, {
                props: {
                  rePic: params.row.deptDomain.allowPic.split(','),
                  cancelShow: false
                }
              })
            ])
          }
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
      getPageListByDept(this.pageNum, this.selectValue).then(res => {
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
