<template>
  <div>
    <Button type="primary" @click="addWorkerValue">添加工人</Button>
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    </div>
    <Modal
      v-model="modalMessage"
      :mask-closable="false"
      title="修改信息"
      width="600">
      <modificationMessage ref="modification" :modificationData="modificationData"></modificationMessage>
      <div slot="footer">
        <Button type="primary" :loading="loading" @click="addSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import { getPageList } from '@/api/constructionOrganizationAdmin/projectAdmin/showWorker'
import clickImg from '_c/clickImg'
import modificationMessage from './modificationMessage'
export default({
  components: {
    editableTables,
    clickImg,
    modificationMessage
  },
  data () {
    return {
      columns: [
        {
          title: '工人姓名',
          key: 'workerName'
        },
        {
          title: '工资标准',
          key: 'workerSalary'
        },
        {
          title: '工种',
          key: 'workerTypeName'
        },
        {
          title: '工号',
          key: 'workerNum'
        },
        {
          title: '卡号',
          key: 'cardNum'
        },
        {
          title: '电话',
          key: 'mobile'
        },
        {
          title: '身份证号码',
          key: 'idCardNum'
        },
        {
          title: '合同照片',
          key: 'contract',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h(clickImg, {
                props: {
                  rePic: params.row.contract.split(','),
                  cancelShow: false
                }
              })
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 70,
          render: (h, params) => {
            return (
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.modalMessage = true
                    this.modificationData = params.row
                  }
                }
              }, '修改')
            )
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
      modalMessage: false,
      modificationData: '',
      loading: false,
      callData: ''
    }
  },
  props: {
    pid: {
      default: ''
    }
  },
  methods: {
    // 分页查询管理员
    getList () {
      this.dataList = []
      getPageList(this.pageNum, this.pid.split(':')[0]).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map((res) => {
          this.dataList.push({
            ...res,
            ...res.workerDomain
          })
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
    modificationEdit () {
      this.loading = true
      this.$refs.modification.handleSubmit('formInline')
      setTimeout(() => {
        this.loading = this.$refs.modification.loading
        this.modalMessage = false
        this.getList()
      }, 500)
    },
    getCallData (e) {
      this.callData = e
    },
    addWorkerValue (e) {

    },
    addSubmit () {
      this.loading = true
      this.$refs.projectAdd.handleSubmit()
    }
  },
  watch: {
    pid () {
      this.getList()
    }
  }
})
</script>
<style>
</style>
