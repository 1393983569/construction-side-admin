<template>
  <div>
    <div>
      <editableTables :showHeader="true" :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'>
      </editableTables>
    </div>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables'
import { getPageList } from '@/api/constructionOrganizationAdmin/projectAdmin/projectAdmin'
import projectAdd from './projectAdd'
import addProjectWorker from './addProjectWorker'
import contractorAdmin from './contractorAdmin'
import projectAdminSelect from '../../advancedFilter-components/projectAdminSelect'
import projectAdminList from './components/projectAdminList'
export default({
  components: {
    editableTables,
    projectAdd,
    addProjectWorker,
    projectAdminSelect,
    contractorAdmin,
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
          title: '项目名',
          key: 'name'
        },
        {
          title: '项目编码',
          key: 'projectCode'
        },
        {
          title: '项目分类',
          key: 'category'
        },
        {
          title: '项目简介',
          key: 'description'
        },
        {
          title: '总承包单位统一社会信用代码',
          key: 'contractorCorpCode'
        },
        {
          title: '总承包单位名称',
          key: 'contractorCorpName'
        },
        {
          title: '建设单位名称',
          key: 'buildCorpCode'
        },
        {
          title: '建设单位统一社会信用代码',
          key: 'buildCorpCode'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 150,
          render: (h, params) => {
            let stateDisabled = true
            if (params.row.pstate + '' === '1' && params.row.bondState + '' === '1' && params.row.grantState + '' === '1') {
              stateDisabled = false
            }
            return h('div', [
              h(contractorAdmin, {
                props: {
                  projectCode: params.row.projectCode + ''
                }
              })
            ])
          }
        }
      ],
      // 基本参数
      dataList: [],
      // 查询参数
      selectValue: {},
      // 分页参数
      pageNum: 1,
      pageTotal: 1,
      // 需求参数
      addModal: false,
      loading: false,
      addModalWorker: false,
      pid: '',
      pidShowWorkerList: '',
      showWorker: false
    }
  },
  methods: {
    // 分页查询
    getList () {
      this.dataList = []
      getPageList(this.pageNum, this.selectValue).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error('暂无数据')
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map((res) => {
          this.dataList.push({...res})
        })
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
    formSuccess (e) {
      if (e) {
        this.loading = false
        this.addModal = false
        this.$refs.projectAdd.emptyForm()
        this.getList()
      } else {
        this.loading = false
      }
    },
    emptyFormCancel () {

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
