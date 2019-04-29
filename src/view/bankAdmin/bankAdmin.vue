<template>
  <div>
    <span>请选择月份：</span>
    <Cascader @on-change="changeCascader" :data="dataSelect" v-model="valueSelect" style="width: 250px; display: inline-block; margin-right: 10px;" :load-data="loadData"></Cascader>
    <span>姓名：</span>
    <Input search placeholder="姓名" :disabled="valueSelect.length === 0" @on-search="clickSearch" style="width: 150px;" />
    <!-- <Button type="success" @click="modalGrant = true, sumSalary = 0" :disabled="buttonState">一键发放</Button> -->
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    </div>
    <!-- <Modal
      v-model="modalGrant"
      title="一键发放(默认实发等于应发)">
      <Input v-model="sumSalary" placeholder="输入总工资" style="width: 300px" />
      <div slot="footer">
        <Button @click="cancelGrant">取消</Button>
        <Button type="success" :loading="modal_loading" @click="confirmGrant">确定</Button>
      </div>
    </Modal> -->
    <Modal
      v-model="modalGrantSingle"
      title="实发工资">
      <Input v-model="salary" placeholder="输入实发工资" style="width: 300px" />
      <div slot="footer">
        <Button @click="cancelGrant">取消</Button>
        <Button type="success" :loading="sumSalarySingle_loading" @click="sumSalarySingleSubmit">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables'
import { projectCorpGetList, getListOfPro, workerSalaryGetPageList, projectCorpTeamGetList, payOff, getPageListGetList } from '@/api/bankAdmin/bankAdmin'
import clickImg from '_c/clickImg'
import { aesDecrypt } from '@/libs/util'
export default({
  components: {
    editableTables,
    clickImg
  },
  data () {
    return {
      columns: [
        {
          title: '工人名称',
          key: 'workerName'
        },
        {
          title: '工人身份证',
          key: 'idCardNumber',
          render: (h, params) => {
            return h('div', aesDecrypt(params.row.idCardNumber))
          }
        },
        {
          title: '电话',
          key: 'cellPhone'
        },
        {
          title: '应发工资',
          key: 'totalPayAmount'
        },
        {
          title: '实发工资',
          key: 'totalPayAmount',
          render: (h, params) => {
            return h('div', params.row.totalPayAmount ? params.row.totalPayAmount : '暂无数据')
          }
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
                  size: 'small',
                  disabled: params.row.state + '' === '1',
                  loading: params.row.loading
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.salary = ''
                    this.wId = params.row.id
                    this.modalGrantSingle = true
                  }
                }
              }, '确认发放')
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
      valueSelect: [],
      dataSelect: [],
      timeList: [],
      getTimeState: '', // -1：预警 1：正常
      getTimeDealState: '', // 处理状态 0：未处理 1：已处理
      timePbId: '',
      modalGrant: false,
      sumSalary: '',
      modal_loading: false,
      buttonState: true,
      modalGrantSingle: false,
      sumSalarySingle: '',
      sumSalarySingle_loading: false,
      wId: '',
      salary: '',
      nameData: ''
    }
  },
  methods: {
    // 分页查询
    getList () {
      this.dataList = []
      workerSalaryGetPageList(this.pageNum, this.timePbId, this.nameData).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.forEach((res) => {
          this.dataList.push({...res, loading: false, workerName: res.workerDomain.workerName, cellPhone: res.workerDomain.cellPhone})
          let state = true
          this.dataList.forEach(item => {
            if (item.state + '' !== '1') {
              state = false
              return
            }
          })
          this.buttonState = state
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
    // 初始化
    inCascading () {
      getListOfPro().then(res => {
        this.dataSelect = []
        res.info.forEach(item => {
          this.dataSelect.push({
              value: item.projectCode + '',
              label: item.name,
              loading: false,
              state: 1,
              children: []
            })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 动态获取
    loadData (item, callback) {
      console.log(item.state)
      item.children = []
      item.loading = true
      if (item.state + '' === '1') {
        projectCorpGetList(item.value).then(res => {
          console.log(this.dataSelect)
          if (res.info === '暂无数据') {
            this.$Message.error('暂无数据')
            item.loading = false
            callback()
            return
          }
          item.children = []
          res.info.forEach((itemFo, index) => {
            item.children[index] = {
              value: itemFo.id + '',
              label: itemFo.corpName,
              children: [],
              state: 2,
              loading: false
            }
          })
          item.loading = false
          callback()
        }).catch(err => {
          console.log(err)
          item.loading = false
        })
      } else if (item.state + '' === '2') {
        projectCorpTeamGetList(item.value).then(res => {
          if (res.info === '暂无数据') {
            this.$Message.error('暂无数据')
            item.loading = false
            callback()
            return
          }
          item.children = []
          res.info.forEach((itemFo, index) => {
            item.children[index] = {
              value: itemFo.teamSysNo + '',
              label: itemFo.teamName,
              children: [],
              state: 3,
              loading: false
            }
          })
          item.loading = false
          callback()
        }).catch(err => {
          console.log(err)
          item.loading = false
        })
      } else {
      getPageListGetList(item.value).then(res => {
          if (res.info === '暂无数据') {
            this.$Message.error('暂无数据')
            item.loading = false
            callback()
            return
          }
          item.children = []
          res.info.forEach((itemFo, index) => {
            item.children[index] = {
              value: itemFo.pbId + '',
              label: itemFo.payMonth
            }
          })
          item.loading = false
          callback()
        }).catch(err => {
          console.log(err)
          item.loading = false
        })
      }
    },
    // 级联
    changeCascader (value) {
      this.selectValue = value[2]
      this.timePbId = value[3]
      this.getList()
    },
    clickSearch (e) {
      this.nameData = e
      this.restoration()
      this.getList()
    },
    // confirmGrant () {
    //   this.modal_loading = true
    //   payOff(this.timePbId, this.sumSalary).then(res => {
    //     this.$Message.success('成功')
    //     this.sumSalary = ''
    //     this.modal_loading = false
    //     this.modalGrant = false
    //     this.getList()
    //   }).catch(err => {
    //     this.$Message.error(err)
    //     this.modal_loading = false
    //   })
    // },
    cancelGrant () {
      this.sumSalary = ''
      this.modalGrant = false
      this.salary = ''
    },
    sumSalarySingleSubmit () {
      this.sumSalarySingle_loading = true
      payOff(this.wId, this.salary).then(res => {
        this.$Message.success('成功')
        this.sumSalary = ''
        this.sumSalarySingle_loading = false
        this.modalGrantSingle = false
        this.getList()
      }).catch(err => {
        this.$Message.error(err)
        this.sumSalarySingle_loading = false
         this.modalGrantSingle = true
      })
    }
  },
  mounted () {
    this.inCascading()
    this.getList()
  }
})
</script>
<style>
</style>
