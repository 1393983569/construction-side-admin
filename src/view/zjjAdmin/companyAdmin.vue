<template>
  <div>
    <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'>
      <Input search @on-search="clickSearch" placeholder="请输入单位名称" />
    </editableTables>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import { getPageDepts, editState, getProjectList, projectQuery } from '@/api/zjjAdmin/companyAdmin'
import clickImg from '_c/clickImg'
import projectAdminList from './components/projectAdminList'
export default({
  components: {
    editableTables,
    clickImg,
    projectAdminList
  },
  data () {
    return {
      columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(projectAdminList, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '组织机构代码',
          key: 'corpCode'
        },
        {
          title: '企业名称',
          key: 'corpName'
        },
        {
          title: '登录手机号',
          key: 'dLoginName'
        },
        {
          title: '法定代表人姓名',
          key: 'legalMan'
        },
        {
          title: '法定代表人职务',
          key: 'legalManDuty'
        },
        {
          title: '法定代表人职称',
          key: 'legaManProTitle'
        },
        {
          title: '法定代表人身份证号码',
          key: 'legalManIDCardNumber'
        },
        {
          title: '注册资本（万元）',
          key: 'regCapital'
        },
        {
          title: '实收资本(万元)',
          key: 'factRegCapital'
        }
      ],
      // 基本参数
      dataList: [],
      // 查询参数
      selectValue: {},
      // 分页参数
      pageNum: 1,
      pageTotal: 1,
      reason: '',
      did: '',
      state: '',
      pid: '',
      modalReasonSee: false
    }
  },
  methods: {
    // 分页查询管理员
    getList () {
      this.dataList = []
      getPageDepts(this.pageNum, this.selectValue).then(res => {
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
    clickSearch (e) {
      this.selectValue.deptName = e
      this.restoration()
      this.getList()
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
