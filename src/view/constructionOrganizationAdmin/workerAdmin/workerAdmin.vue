<template>
  <div>
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'>
        <Button type="primary" style="margin-right: 10px" @click="addWorker">添加工人</Button>
        <span>姓名：</span>
        <Input search placeholder="请填写姓名" style="width: 150px;" @on-search="clickSearch" />
      </editableTables>
    </div>
    <Modal
      v-model="addModal"
      :mask-closable='false'
      title="添加工人"
      width="600">
      <addWorker ref="addWorker" :dataList="modificationList" @formState="formSuccess" @controlState="controlState" ></addWorker>
      <div slot="footer">
        <Button type="primary" :loading="loading" @click="addOk" :disabled="disabled">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import { workerQuery } from '@/api/constructionOrganizationAdmin/workerAdmin/workerAdmin'
import clickImg from '_c/clickImg'
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
          title: '工人姓名',
          key: 'workerName'
        },
        {
          title: '性别',
          key: 'sex',
          render: (h, params) => {
            let htmlText = params.row.sex + '' === '1' ? '<span>男</span>' : '<span>女</span>'
            return (
              <div domPropsInnerHTML={htmlText}></div>
            )
          }
        },
        {
          title: '身份证号',
          key: 'idCardNum'
        },
        {
          title: '身份证正面',
          key: 'idFront',
          width: 120,
          render: (h, params) => {
            if (params.row.idFront) {
              return h('div', [
                h(clickImg, {
                  props: {
                    rePic: [params.row.idFront],
                    cancelShow: false
                  }
                })
              ])
            } else {
              return (
                <div>暂无数据</div>
              )
            }
          }
        },
        {
          title: '身份证反面',
          key: 'idBack',
          width: 120,
          render: (h, params) => {
            if (params.row.idBack) {
              return h('div', [
                h(clickImg, {
                  props: {
                    rePic: [params.row.idBack],
                    cancelShow: false
                  }
                })
              ])
            } else {
              return (
                <div>暂无数据</div>
              )
            }
          }
        },
        {
          title: '住址',
          key: 'liveAddr'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
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
                    this.addModal = true
                    this.modificationList = params.row
                    // 清除add状态
                    this.apiState = ''
                    this.$refs.addWorker.cardSubmit('formIdCard', params.row.idCardNum)
                  }
                }
              }, '修改')
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
      modificationList: [],
      apiState: '',
      disabled: true
    }
  },
  methods: {
    // 分页查询管理员
    getList () {
      this.dataList = []
      workerQuery(this.pageNum, this.selectValue).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
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
    // 添加工人
    addWorker () {
      this.apiState = 'add'
      this.$refs.addWorker.emptyForm()
      this.addModal = true
    },
    addOk () {
      this.loading = true
      this.$refs.addWorker.handleSubmit('formInline', this.apiState)
      setTimeout(() => {
        this.loading = this.$refs.addWorker.loading
      }, 500)
    },
    formSuccess (e) {
      if (e) {
        this.loading = false
        this.addModal = false
        this.getList()
      } else {
        this.loading = false
      }
    },
    clickSearch (e) {
      this.selectValue.workerName = e
      this.restoration()
      this.getList()
    },
    controlState (e) {
      this.disabled = e
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
