<template>
  <div>
    <span>请选择月份：</span>
    <Cascader @on-change="changeCascader" :data="dataSelect" v-model="valueSelect" style="width: 250px; display: inline-block; margin-right: 10px;" :load-data="loadData"></Cascader>
    <span>姓名：</span>
    <Input search placeholder="姓名" @on-search="clickSearch" style="width: 150px;" />
    <div style="margin-top: 8px">
      <span>状态：</span>
      <RadioGroup  v-model="radioGroupState" @on-change="hangeRadioGroup">
          <Radio label="2">不限</Radio>
          <Radio label="1">已处理</Radio>
          <Radio label="0">未处理</Radio>
      </RadioGroup>
    </div>
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    </div>
  </div>
</template>
<script>
  // 基本模板
  import editableTables from '_c/editableTables/editableTables'
  import { projectCorpGetList, getListOfPro, projectCorpTeamGetList, getPageListGetList } from '@/api/bankAdmin/bankAdmin'
  import { getPageListOfWarnWorker } from '@/api/zjjAdmin/supervision'
  import {s} from '@/api/zjjAdmin/supervision'
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
            title: '所在公司',
            key: 'corpName',
            render: (h, params) => {
              return h('div', params.row.workerDomain.projectCorpTeamDomain.projectCorpDomain.corpName ? params.row.workerDomain.projectCorpTeamDomain.projectCorpDomain.corpName : '暂无数据')
            }
          },
          {
            title: '处理状态',
            key: 'isBackPay',
            render: (h, params) => {
              return (
                <div>
                {params.row.isBackPay + '' === '1' ?  <span style="color: #19be6b" >已处理</span> : <span style="color: #be4536">未处理</span>}
                </div>
              )
            }
          },
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
        sumSalarySingle: '',
        wId: '',
        salary: '',
        projectCode: '',
        isBackPay: '',
        radioGroupState: ''
      }
    },
    methods: {
      // 分页查询
      getList () {
        this.dataList = []
        getPageListOfWarnWorker(this.pageNum, this.timePbId, this.projectCode, this.isBackPay).then(res => {
          this.dataList = []
          try {
            if (res.info === '暂无数据') {
              this.$Message.error(res.info)
              this.pageTotal = 1
              return
            }
            this.pageTotal = res.info.pageTotal
            res.info.data.forEach((res) => {
              this.dataList.push({...res, loading: false, workerName: res.workerDomain.workerName, cellPhone: res.workerDomain.cellPhone})
            })
          }catch (e) {
            console.log(e)
          }
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
                value: itemFo.corpCode + '',
                label: itemFo.corpName,
                // children: [],
                // state: 2,
                // loading: false
              }
            })
            item.loading = false
            callback()
          }).catch(err => {
            console.log(err)
            item.loading = false
          })
        }
        // else if (item.state + '' === '2') {
        //   projectCorpTeamGetList(item.value).then(res => {
        //     if (res.info === '暂无数据') {
        //       this.$Message.error('暂无数据')
        //       item.loading = false
        //       callback()
        //       return
        //     }
        //     item.children = []
        //     res.info.forEach((itemFo, index) => {
        //       item.children[index] = {
        //         value: itemFo.teamSysNo + '',
        //         label: itemFo.teamName,
        //         children: [],
        //         state: 3,
        //         loading: false
        //       }
        //     })
        //     item.loading = false
        //     callback()
        //   }).catch(err => {
        //     console.log(err)
        //     item.loading = false
        //   })
        // } else {
        //   getPageListGetList(item.value).then(res => {
        //     if (res.info === '暂无数据') {
        //       this.$Message.error('暂无数据')
        //       item.loading = false
        //       callback()
        //       return
        //     }
        //     item.children = []
        //     res.info.forEach((itemFo, index) => {
        //       item.children[index] = {
        //         value: itemFo.id + '',
        //         label: itemFo.payMonth
        //       }
        //     })
        //     item.loading = false
        //     callback()
        //   }).catch(err => {
        //     console.log(err)
        //     item.loading = false
        //   })
        // }
      },
      // 级联
      changeCascader (value) {
        // this.selectValue = value[2]
        this.projectCode = value[0]
        this.timePbId = value[1]
        this.getList()
      },
      clickSearch (e) {
        this.selectValue.workerName = e
        this.getList()
        this.restoration()
      },
      hangeRadioGroup (e) {
        if (e + '' === '2') {
          this.isBackPay = ''
        } else {
          this.isBackPay = e
        }
        this.getList()
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
