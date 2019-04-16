<template>
  <div>
    <span>项目：</span>
    <Cascader @on-change="changeCascader" :data="dataSelect" v-model="valueSelect" style="width: 250px; display: inline-block" :load-data="loadData"></Cascader>
    <RadioGroup v-model="selectValue" @on-change="changeRadioGroup">
      <Radio :disabled="valueSelect.length === 0" label="0">未处理 </Radio>
      <Radio :disabled="valueSelect.length === 0" label="1">已处理</Radio>
    </RadioGroup>
    <Icon type="ios-close" class="icon-delete-select" @click="changeRadioGroup('del')" />
    <div>
      <Table class="zdyClass" :row-class-name="rowClassName" :columns="columns" :data="dataList" style="margin-top: 10px"></Table>
    </div>
    <Modal
        v-model="modalDefaultShow"
        width="700"
        title="拖欠薪资工人">
        <defauleShow :pId="valuePid" :createTime="createTime" :state="selectValue"></defauleShow>
    </Modal>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables'
import { getPropject, getPageDepts } from '@/api/bankAdmin/bankAdmin'
import { getTime } from '@/api/zjjAdmin/supervision'
import clickImg from '_c/clickImg/'
import defauleShow from './defauleShow'
export default({
  components: {
    editableTables,
    clickImg,
    defauleShow
  },
  props: {

  },
  data () {
    return {
      columns: [
        {
          title: '拖欠工资时间',
          key: 'createTime'
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
                    this.createTime = params.row.createTime + '*' + new Date()
                    this.modalDefaultShow = true
                  }
                }
              }, '查看拖欠人')
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
      valueSelect: [],
      dataSelect: [],
      pidValue: '',
      timeList: [],
      getTimeDealState: '', // 处理状态 0：未处理 1：已处理
      timePbId: '',
      valuePid: '',
      modalDefaultShow: false,
      createTime: ''
    }
  },
  methods: {
    // 分页查询管
    getList () {
      this.dataList = []
      getTime(this.valuePid, this.selectValue).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.forEach((res) => {
          this.dataList.push({
            createTime: res.createTime.substring(0, 7),
            dealState: res.dealState + ''
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
    // 颜色渲染
    rowClassName (row, index) {
      if (row.dealState === '0') {
        return 'demo-table-error-row'
      } else {
        return 'demo-table-success-row'
      }
    },
    // 选择状态
    changeRadioGroup (e) {
      if (e === 'del') {
        this.selectValue = ''
      } else {
        this.selectValue = e
      }
      this.getList()
    },
    // 初始化
    inCascading () {
      getPageDepts(2).then(res => {
        this.dataSelect = []
        res.info.forEach(item => {
          if (item.haveProState + '' === '1') {
            this.dataSelect.push({
              value: item.did + '',
              label: item.deptName,
              loading: false,
              state: 1,
              children: []
            })
          }
        })
        this.indYnamicState()
      }).catch(err => {
        console.log(err)
      })
    },
    // 动态初始化 用于初始化回显
    indYnamicState () {
      // 先获取 项目
      getPropject(this.dataSelect[0].value).then(res => {
        this.dataSelect[0].children = []
        res.info.forEach(item => {
          this.dataSelect[0].children.push({
            value: item.pid + '',
            label: item.projectName
          })
        })
        this.pidValue = res.info[0].pid
        return res.info[0].pid
      }).then(resPid => {
        this.getTimeList(resPid)
      }).catch(err => {
        console.log(err)
      })
    },
    // 动态获取
    loadData (item, callback) {
      item.loading = true
      if (item.state + '' === '1') {
        getPropject(item.value).then(res => {
          if (res.info === '暂无数据') {
            this.$Message.error('暂无数据')
            item.loading = false
            callback()
            return
          }
          item.children = []
          res.info.forEach((itemFo, index) => {
            item.children[index] = {
              value: itemFo.pid + '',
              label: itemFo.projectName
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
    getTimeList (resPid) {
      if (!resPid) return
      // 获取项目下的 时间
      getTime(resPid, this.getTimeDealState).then(res => {
        if (res.info === '暂无数据') {
          this.$Message.error('暂无数据')
          // 默认回显 公司下的项目
          this.valueSelect = [
          // 入驻单位id
            this.dataSelect[0].value + '',
            // 入驻单位项目id
            this.dataSelect[0].children[0].value + ''
          ]
          return
        }
        this.dataSelect[0].children[0].children = []
        res.info.forEach((itemFo, index) => {
          // this.timePbId = itemFo
          // this.dataSelect[0].children[0].children[index] = {
          //   value: itemFo.pbId + '',
          //   label: itemFo.createTime.substring(0, 7)
          // }
        })
        // 默认回显 公司下的项目
        this.valueSelect = [
          // 入驻单位id
          this.dataSelect[0].value + '',
          // 入驻单位项目id
          this.dataSelect[0].children[0].value + ''
          // 项目时间id
          // this.dataSelect[0].children[0].children[0].value
        ]
        this.valuePid = this.dataSelect[0].children[0].value
        // 初始化管理员列表
        this.getList()
      }).catch(err => {
        console.log(err)
      })
    },
    // 级联
    changeCascader (value) {
      console.log(value)
      this.pidValue = value[0]
      // this.timePbId = value[2]
      this.valuePid = value[1]
      this.getList()
    }
  },
  mounted () {
    this.inCascading()
  }
})
</script>
<style>
.ivu-table .demo-table-error-row td{
  background-color: rgba(255, 102, 0, 0.2)
}
.ivu-table .demo-table-success-row td{
  background-color: rgba(96, 255, 14, 0.21)
}
.icon-delete-select {
  font-size: 24px;
  cursor: pointer;
}
</style>
