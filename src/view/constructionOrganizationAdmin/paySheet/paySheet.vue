<template>
  <div>
    <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'>
      <!--<Button type="primary" @click="submitPayroll">提交工资单</Button>-->
      <span>请选择项目：</span>
      <Select v-model="selectProject" style="width:200px" @on-change="changeSelect">
        <Option v-for="(item, index) in prorjectList" :value="item.pid" :key="index">{{ item.projectName }}</Option>
      </Select>
      <span style="display: inline-block; margin-left: 10px">姓名：</span>
      <Input class="custom-class-input" search placeholder="请输入姓名" style="width: 150px;" @on-search="clackSearch" />
      <!-- <Upload :action="`${upUrl}/admin/statistic/import`" style="display: inline-block;"> -->
      <div style="margin-top: 5px">
        <Upload :action="`//192.168.31.19:8081/admin/statistic/import`" style="display: inline-block;">
          <span>请选择文件：</span>
          <Button icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </div>
    </editableTables>
    <Modal
      v-model="modalClock"
      draggable
      :title="`${workerName}考勤记录`">
      <Table :columns="checkingIn" :data="dataCheckingIn"></Table>
      <Page :total="pageTotalCheckingIn * 10" @on-change="checkingInPaging" style="margin-top: 10px"/>
    </Modal>
    <Modal
    v-model="modaUploading"
    draggable
    width="350"
    :title="`${workerName}应发工资：${oughtToSalary}`">
    <div v-if="defaultList.length !== 0">
      <span style="font-weight: 700">
        拖欠月
      </span>
        <span style="color: #c54843">
        （请选择未发放日期 不选默认当月）
      </span>
        <div style="margin-bottom: 10px">
          <CheckboxGroup v-model="checkboxList" >
            <Checkbox :label="item.wId + ':' + item.pbId + ':' + item.createTime" v-for="(item, index) in defaultList" :key="index">{{item.createTime}}</Checkbox>
          </CheckboxGroup>
        </div>
      </div>
      <span style="font-weight: 700">实发工资</span>
      <InputNumber :min="0" v-model="salaryValue" style="width: 100%; margin-top: 5px"></InputNumber>
      <div slot="footer">
        <Button type="success" size="large" long :loading="modaUploading_loading" @click="salaryUploading">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="uploadClock"
      width="950"
      :title="`${workerName}统计单`">
      <statistics ref="statisticsRef"></statistics>
    </Modal>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import { getClockInList, getProjectListAll, getPageListRecord, proBankAdd, queryOfWorkerTime, addOfWarn } from '@/api/constructionOrganizationAdmin/paySheet/paySheet'
import { getPageListOfWorker } from '@/api/constructionOrganizationAdmin/workerAdmin/workerAdmin'
import clickImg from '_c/clickImg'
import config from '@/config'
import statistics from './components/statistics'
export default({
  components: {
    editableTables,
    clickImg,
    statistics
  },
  data () {
    return {
      columns: [
        {
          title: '工人姓名',
          key: 'workerName'
        },
        {
          title: '电话',
          key: 'mobile'
        },
        {
          title: '卡号',
          key: 'cardNum'
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
          title: '工资待遇',
          key: 'workerSalary'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 240,
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
                    this.uploadClock = true
                    this.workerName = params.row.workerName
                    this.$refs.statisticsRef.pId = this.selectProject
                    this.$refs.statisticsRef.wId = params.row.wid
                    this.$refs.statisticsRef.getList()
                  }
                }
              }, '统计'),
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
                    this.modalClock = true
                    this.workerName = params.row.workerName
                    this.dataCheckingIn = []
                    this.wid = params.row.wid
                    this.getCheckingIn()
                  }
                }
              }, '考勤记录'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: this.dataList[params.index].isSelect + '' === '1' && this.dataList[params.index].warnState + '' === '1'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: async () => {
                    // 清空选择数据
                    this.checkboxList = []
                    this.defaultList = []
                    this.wid = params.row.wid
                    this.salaryValue = 0
                    this.oughtToSalary = params.row.workerSalary
                    this.workerName = params.row.workerName
                    this.modaUploading = true
                    this.clickIndex = params.index
                    let dataList = await queryOfWorkerTime(this.selectProject, this.wid)
                    if (dataList.info !== '暂无数据') {
                      this.defaultList = []
                      dataList.info.forEach(item => {
                        this.defaultList.push({
                          pId: item.pId,
                          createTime: item.createTime.substring(0, 7),
                          wId: this.wid,
                          pbId: item.pbId
                        })
                      })
                    }
                  }
                }
              }, '工资上传')
            ])
          }
        }
      ],
      checkingIn: [
        {
          title: '时间',
          key: 'cardTime'
        },
        {
          title: '门',
          key: 'doorNum'
        }
      ],
      // 基本参数
      dataList: [],
      // 查询参数
      selectValue: {},
      // 分页参数
      pageNum: 1,
      pageTotal: 1,
      pageingValue: 1,
      // 需求参数
      addModal: false,
      loading: false,
      modificationList: [],
      pId: '',
      wId: '',
      modalClock: false,
      selectProject: '',
      prorjectList: [],
      modalPayroll: false,
      dataCheckingIn: [],
      workerName: '',
      wid: '',
      pageTotalCheckingIn: 1,
      modaUploading: false,
      modaUploading_loading: false,
      salaryValue: 0,
      oughtToSalary: 0,
      clickIndex: '',
      defaultList: [],
      checkboxList: [],
      uploadClock: false,
      upUrl: config.baseUrl.pro,
      statisticsPId: '',
      statisticsWId: ''
    }
  },
  methods: {
    getList () {
      this.dataList = []
      getPageListOfWorker(this.pageNum, this.selectValue).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map((res) => {
          this.dataList.push({...res, ...res.workerDomain})
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
    // 提交工资单
    submitPayroll () {
      this.modalPayroll = true
      // this.addModal = true
    },
    addOk () {
      this.loading = true
      this.$refs.addWorker.handleSubmit('formInline')
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
    // 选择项目
    changeSelect (e) {
      this.selectValue.pid = e
      this.getList()
    },
    // 获得考勤列表
    getClockIn () {
      getClockInList().then(res => {
        console.log(res)
      }).catch(res => {

      })
    },
    async getProject () {
      this.prorjectList = []
      // 获得项目
      await getProjectListAll().then(res => {
        this.prorjectList = []
        res.info.forEach(item => {
          this.prorjectList.push(item)
        })
      }).catch(err => {
        console.log(err)
      })
      if (this.prorjectList.length === 0) {
        this.$Message.error('暂无数据')
        return
      }
      this.selectProject = this.prorjectList[0].pid
      this.selectValue = {pid: this.prorjectList[0].pid}
      // 初始化列表
      this.getList()
    },
    // 考勤记录查询
    getCheckingIn () {
      this.dataCheckingIn = []
      getPageListRecord(this.pageingValue, this.selectProject, this.wid).then(res => {
        if (res.info === '暂无数据') {
          this.$Message.error('暂无数据')
          this.pageTotalCheckingIn = 1
          return
        }
        this.pageTotalCheckingIn = res.info.pageTotal
        this.dataCheckingIn = []
        res.info.data.forEach(item => {
          this.dataCheckingIn.push({
            cardNum: item.cardNum,
            doorNum: item.doorNum,
            cardTime: item.cardTime
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 考勤记录分页
    checkingInPaging (e) {
      this.pageingValue = e
      this.getCheckingIn()
    },
    // 上传工资
    salaryUploading () {
      let dataLis = []
      this.modaUploading_loading = true
      if (this.checkboxList.length !== 0) {
        // 非正常发放
        this.checkboxList.forEach(item => {
          let list = item.split(':')
          dataLis.push({
            // 工人id
            wId: list[0],
            // pdId
            pdId: list[1],
            // 时间
            createTime: list[2],
            // 金额
            realSalary: this.salaryValue,
            // 项目id
            pId: this.selectProject
          })
        })
        addOfWarn(dataLis).then(res => {
          this.modaUploading_loading = false
          this.modaUploading = false
          this.oughtToSalary = ''
          this.wid = ''
          this.workerName = ''
          this.salaryValue = 0
          this.dataList[this.clickIndex].isSelect = 1
          this.$Message.success(res.info)
          this.getList()
        }).catch(err => {
          this.modaUploading_loading = false
          this.$Message.error(err)
        })
      } else {
        // 正常发放工资
        proBankAdd(this.selectProject, this.wid, this.salaryValue).then(res => {
          this.modaUploading_loading = false
          this.modaUploading = false
          this.oughtToSalary = ''
          this.wid = ''
          this.workerName = ''
          this.salaryValue = 0
          this.dataList[this.clickIndex].isSelect = 1
          this.$Message.success(res.info)
          this.getList()
        }).catch(err => {
          this.modaUploading_loading = false
          this.$Message.error(err)
        })
      }
    },
    clackSearch (e) {
      this.selectValue.workerName = e
      this.restoration()
      this.getList()
    }
  },
  mounted () {
    // 初始化项目
    this.getProject()
  }
})
</script>
<style>
  .custom-class-input {

  }
</style>
