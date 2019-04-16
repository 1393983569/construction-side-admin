<template>
  <div>
    <div>
      <projectAdminSelect @sendDataList="sendDataList"></projectAdminSelect>
      <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'>
        <Button type="primary" @click="addProject">添加项目</Button>
      </editableTables>
      <Modal
        v-model="addModal"
        :mask-closable='false'
        title="添加项目"
        width="600">
        <projectAdd ref="projectAdd" @formState="formSuccess"></projectAdd>
        <div slot="footer">
          <Button type="primary" :loading="loading" @click="addOk">提交</Button>
        </div>
      </Modal>
      <Modal
        v-model="addModalWorker"
        :mask-closable='false'
        title="添加项目工人"
        width="600">
        <addProjectWorker ref="addWorker" @formState="formSuccessWorker" :did="did" :pid="pid"></addProjectWorker>
        <div slot="footer">
          <Button type="primary" :loading="loading" @click="addWorkerOk">提交</Button>
        </div>
      </Modal>
      <Modal
        v-model="showWorker"
        :mask-closable='false'
        title="查看工人"
        width="900">
        <showWorkerList ref="refShowWorker" @formState="formSuccessWorker" :pid="pidShowWorkerList"></showWorkerList>
      </Modal>
    </div>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables'
import { getPageList } from '@/api/constructionOrganizationAdmin/projectAdmin/projectAdmin'
import projectAdd from './projectAdd'
import addProjectWorker from './addProjectWorker'
import showWorkerList from './showWorker'
import contractorAdmin from './contractorAdmin'
import projectAdminSelect from '../../advancedFilter-components/projectAdminSelect'
export default({
  components: {
    editableTables,
    projectAdd,
    addProjectWorker,
    showWorkerList,
    projectAdminSelect,
    contractorAdmin
  },
  data () {
    return {
      columns: [
        {
          title: '项目名',
          key: 'projectName'
        },
        // {
        //   title: '项目编号',
        //   key: 'projectNum'
        // },
        {
          title: '项目地址',
          key: 'projectAddr'
        },
        {
          title: '建筑规模',
          key: 'buildSize'
        },
        {
          title: '投资规模',
          key: 'investSize'
        },
        {
          title: '项目类型',
          key: 'projectType'
        },
        {
          title: '投资主体',
          key: 'investMain'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 260,
          render: (h, params) => {
            let stateDisabled = true
            if (params.row.pstate + '' === '1' && params.row.bondState + '' === '1' && params.row.grantState + '' === '1') {
              stateDisabled = false
            }
            console.log(stateDisabled)
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: stateDisabled
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$refs.addWorker.emptyForm()
                    this.pid = params.row.pid
                    this.did = params.row.did
                    this.addModalWorker = true
                  }
                }
              }, '添加工人'),
              h(contractorAdmin, {
                props: {
                  parentId: params.row.pid + '',
                  did: params.row.did + '',
                  pid: params.row.pid + '',
                  disabled: stateDisabled
                }
              }),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small',
                  disabled: stateDisabled
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.pidShowWorkerList = params.row.pid + ':' + new Date()
                    this.showWorker = true
                  }
                }
              }, '查看工人')
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
      did: '',
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
      this.accountTitle = ''
      this.accountJob = ''
      this.pageNum = 1
    },
    // 添加项目模块
    addProject () {
      this.$refs.projectAdd.emptyForm()
      this.addModal = true
    },
    addOk () {
      this.loading = true
      this.$refs.projectAdd.handleSubmit('formInline')
      setTimeout(() => {
        this.loading = this.$refs.projectAdd.loading
      }, 500)
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
    // 添加工人 响应结果
    formSuccessWorker (e) {
      if (e) {
        this.loading = false
        this.addModalWorker = false
        // 清空表单数据
        this.$refs.addWorker.emptyForm()
      } else {
        this.loading = false
      }
    },
    addWorkerOk () {
      this.loading = true
      this.$refs.addWorker.handleSubmit('formInline')
      setTimeout(() => {
        this.loading = this.$refs.addWorker.loading
      }, 500)
    },
    sendDataList (e) {
      e.forEach(item => {
        for (let key in item) {
          this.selectValue[key] = item[key]
        }
      })
      // console.log(this.selectValue)
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
