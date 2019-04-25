<template>
  <div>
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    </div>
    <Modal
      v-model="modalMessage"
      title="添加工人"
      :mask-closable="false"
      width="900">
      <addWorker ref="addWorkerRef" @submitState="submitState" :projectCorpId="teamOrGroupId + ''"></addWorker>
      <div slot="footer">
        <Button type="primary" :loading="loading" @click="addWorkerOk">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  // 基本模板
  import editableTables from '_c/editableTables/editableTables.vue'
  import clickImg from '_c/clickImg'
  import { projectCorpTeam } from '@/api/constructionOrganizationAdmin/projectAdmin/teamOrGroup'
  import { aesDecrypt } from '@/libs/util'
  import addWorker from './addWorker'
  export default({
    components: {
      editableTables,
      clickImg,
      addWorker
    },
    data () {
      return {
        columns: [
          {
            title: '班组名称',
            key: 'teamName'
          },
          {
            title: '责任人姓名',
            key: 'responsiblePersonName'
          },
          {
            title: '责任人联系电话',
            key: 'responsiblePersonPhone'
          },
          {
            title: '责任人证件号码',
            key: 'responsiblePersonIDNumber',
            render: (h, params) => {
              return h('div', aesDecrypt(params.row.responsiblePersonIDNumber))
            }
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '进场日期',
            key: 'entryTime'
          },
          {
            title: '退场日期',
            key: 'exitTime'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 180,
            render: (h, params) => {
              return h('div', [
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
                      console.log(params.row.teamSysNo)
                      this.modalMessage = true
                      this.teamOrGroupId = params.row.teamSysNo + ''
                      this.$refs.addWorkerRef.getDictionaries()
                      this.$refs.addWorkerRef.handleReset()
                    }
                  }
                }, '添加工人')
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
        pageTotal: 1,
        // 需求参数
        modalMessage: false,
        modificationData: '',
        loading: false,
        callData: '',
        projectCorpId: '',
        teamOrGroupId: ''
      }
    },
    methods: {
      // 分页查询班组
      getList (projectCorpId) {
        this.dataList = []
        this.projectCorpId = projectCorpId
        projectCorpTeam(this.pageNum, this.projectCorpId).then(res => {
          this.dataList = []
          if (res.info === '暂无数据') {
            this.$Message.error(res.info)
            this.pageTotal = 1
            return
          }
          this.pageTotal = res.info.pageTotal
          console.log(res.info.data)
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
      addWorkerOk () {
        this.loading = true
        this.$refs.addWorkerRef.handleSubmit('formInline')
      },
      submitState (e) {
        console.log(e)
        // 提交成功
        if (e) {
          this.loading = false
          this.modalMessage = false
        // 失败
        } else {
          this.loading = false
           this.modalMessage = true
        }
      }
    }
  })
</script>
<style>
</style>
