<template>
  <div>
    <span>请选择月份：</span>
    <Cascader @on-change="changeCascader"  :data="dataSelect" v-model="valueSelect" style="width: 250px; display: inline-block; margin-right: 10px;" :load-data="loadData"></Cascader>
    <span>姓名：</span>
    <Input search placeholder="姓名" :disabled="valueSelect.length === 0" @on-search="clickSearch" style="width: 150px;" />
    <!--<Button type="success" @click="modalGrant = true">一键发放</Button>-->
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    </div>
    <Modal
      v-model="modalGrant"
      title="一键发放">
      <Input v-model="sumSalary" placeholder="输入总工资" style="width: 300px" />
      <div slot="footer">
        <Button @click="cancelGrant">取消</Button>
        <Button type="success" :loading="modal_loading" @click="confirmGrant">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables'
import { getPropject, getPageDepts, workerSalaryGetPageList, getTime, payOff } from '@/api/bankAdmin/bankAdmin'
import clickImg from '_c/clickImg'
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
          key: 'idCardNum'
        },
        {
          title: '电话',
          key: 'mobile'
        },
        {
          title: '实发工资',
          key: 'realSalary'
        },
        {
          title: '状态',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return (<div>{params.row.state + '' === '1' ? <span style="color: #19d44d">已发放</span> : <span style="color: #d6681c">未发放</span>}</div>)
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
      pidValue: '',
      timeList: [],
      getTimeState: '', // -1：预警 1：正常
      getTimeDealState: '', // 处理状态 0：未处理 1：已处理
      timePbId: '',
      modalGrant: false,
      sumSalary: '',
      modal_loading: false
    }
  },
  methods: {
    // 分页查询管理员
    getList () {
      this.dataList = []
      workerSalaryGetPageList(this.pageNum, this.selectValue, this.pidValue, this.timePbId).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map((res) => {
          this.dataList.push({...res, ...res.workerDomain, loading: false})
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
      getPageDepts(1).then(res => {
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
        console.log(res)
        this.dataSelect[0].children = []
        res.info.forEach(item => {
          this.dataSelect[0].children.push({
            value: item.pid + '',
            label: item.projectName,
            state: 2,
            loading: false,
            children: []
          })
        })
        this.pidValue = res.info[0].pid
        return res.info[0].pid
      }).then(resPid => {
        // 获取项目下的 时间
        getTime(resPid, this.getTimeState, this.getTimeDealState).then(res => {
          if (res.info === '暂无数据') {
            this.$Message.error('暂无数据')
            return
          }
          this.dataSelect[0].children[0].children = []
          res.info.forEach((itemFo, index) => {
            this.dataSelect[0].children[0].children[index] = {
              value: itemFo.pbId + '',
              label: itemFo.createTime.substring(0, 7)
            }
          })
          // 默认回显第一个公司的第一个项目
          this.valueSelect = [
            // 入驻单位id
            this.dataSelect[0].value + '',
            // 入驻单位项目id
            this.dataSelect[0].children[0].value + '',
            // 项目时间id
            this.dataSelect[0].children[0].children[0].value
          ]
          this.timePbId = this.dataSelect[0].children[0].children[0].value
          // 初始化管理员列表
          this.getList()
        }).catch(err => {
          console.log(err)
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
        getPropject(item.value).then(res => {
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
              value: itemFo.pid + '',
              label: itemFo.projectName,
              children: [],
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
        getTime(item.value).then(res => {
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
              label: itemFo.createTime.substring(0, 7)
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
      this.pidValue = value[0]
      this.selectValue = value[1]
      this.timePbId = value[2]
      this.getList()
    },
    clickSearch (e) {
      this.selectValue.workerName = e
      this.getList()
      this.restoration()
    },
    confirmGrant () {
      this.modal_loading = true
      payOff(this.timePbId, this.pidValue, this.sumSalary).then(res => {
        this.$Message.success('成功')
        this.sumSalary = ''
        this.modal_loading = false
        this.modalGrant = false
      }).catch(err => {
        this.$Message.error(err)
        this.modal_loading = false
      })
    },
    cancelGrant () {
      this.sumSalary = ''
      this.modalGrant = false
    }
  },
  mounted () {
    this.inCascading()
  }
})
</script>
<style>
</style>
