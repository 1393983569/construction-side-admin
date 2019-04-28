<template>
  <div>
    <Button type="primary" @click="cancelProjectInit">添加项目</Button>
    <Modal
      v-model="projectAddState"
      width="600"
      title="实发工资">
      <Form ref="formInlineProject" :model="formInlineProject" :rules="ruleInlineProject" inline>
        <FormItem prop="projectCode" label="项目编码">
          <div>
            <Input type="text" @on-blur="blurProject" v-model="formInlineProject.projectCode" style="width: 250px" placeholder="项目编码"></Input>
            <Spin style="display: inline-block" v-if="projectState">
              <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            </Spin>
            <span v-if="projectExist">
              <Icon type="md-checkmark" style="color: #19be6b; font-size: 18px"/>
            </span>
          </div>
        </FormItem>
        <FormItem prop="mainboardNum" label="主板编号">
          <Input type="text" v-model="formInlineProject.mainboardNum" style="width: 250px" placeholder="主板编号"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelProject">取消</Button>
        <Button type="primary" :loading="project_loading" @click="projectSubmit">确定</Button>
      </div>
    </Modal>
    <div>
      <editableTables :showHeader="true" :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'>
      </editableTables>
    </div>
    <Modal
      v-model="modalTrain"
      width="900"
      title="实发工资">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="trainingDate" label="培训日期">
          <DatePicker type="date" placeholder="培训日期" v-model="formInline.trainingDate" style="width: 250px"></DatePicker>
        </FormItem>
        <FormItem prop="trainingDuration" label="培训时长(小时)">
          <Input type="text" v-model="formInline.trainingDuration" style="width: 250px" placeholder="培训时长"></Input>
        </FormItem>
        <FormItem prop="trainingName" label="培训名称">
          <Input type="text" v-model="formInline.trainingName" style="width: 250px" placeholder="培训名称"></Input>
        </FormItem>
        <FormItem prop="trainingTypeCode" label="培训类型">
          <Select v-model="formInline.trainingTypeCode" style="width: 250px" placeholder="请选择工种" filterable >
            <Option :value="'003001'">安全教育</Option>
            <Option :value="'003002'">入场教育</Option>
            <Option :value="'003003'">退场教育</Option>
            <Option :value="'003004'">技能培训</Option>
          </Select>
        </FormItem>
        <FormItem prop="trainer" label="培训人">
          <Input type="text" v-model="formInline.trainer" style="width: 250px" placeholder="培训人"></Input>
        </FormItem>
        <FormItem prop="trainingOrg" label="培训机构">
          <Input type="text" v-model="formInline.trainingOrg" style="width: 250px" placeholder="培训机构"></Input>
        </FormItem>
        <FormItem prop="trainingAddress" label="培训地址">
          <Input type="text" v-model="formInline.trainingAddress" style="width: 250px" placeholder="培训地址"></Input>
        </FormItem>
        <FormItem prop="description" label="培训简述">
          <Input type="text" v-model="formInline.description" style="width: 250px" placeholder="培训简述"></Input>
        </FormItem>
        <FormItem prop="radioState" label="是否上传附件">
          <RadioGroup v-model="formInline.radioState" @on-change="radioStateChange">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem>
        <div style="width: 250px" v-if="formInline.radioState + '' === '1'">
          <div style="margin-bottom: 5px; color: #adacac">附件</div>
          <div style="border: 1px dashed #dadada; padding: 8px; margin-bottom: 10px">
            <FormItem prop="accessoryName" label="附件名称">
              <Input type="text" v-model="formInline.accessoryName"  style="width: 200px" placeholder="附件名称" />
            </FormItem>
            <FormItem prop="accessoryData" label=" " style="display: block">
              <Upload :action="`${configUrl}/projectCorpTeam/importFile`"
                      :on-success="fileSuccess"
                      type="drag"
                      style="display: inline-block; vertical-align: top; margin-top: 10px"
                      :before-upload="handleBeforeUpload"
                      :format="['jpg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx']"
                      :on-format-error="onFormat"
                      :on-remove="onRemoveList"
                    >
                <Button icon="ios-cloud-upload-outline" >上传文件</Button>
              </Upload>
            </FormItem>
          </div>
        </div>
      </Form>
      <listSelecTimplement v-model="selectedList" :title="'工人列表'" :workerList="workerList" style="display: inline-block"/>
      <Table height="355" :columns="columnsSelectedWorkerList" :data="selectedWorkerList" style="width: 560px; display: inline-block"></Table>
      <div slot="footer">
        <Button @click="cancelGrant">取消</Button>
        <Button type="primary" :loading="sumSalarySingle_loading" @click="accessorySubmit">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables'
import { getPageList, workerGetPageList, trainAdd, projectQuery, projectAddMainboardNum } from '@/api/constructionOrganizationAdmin/projectAdmin/projectAdmin'
import projectAdd from './projectAdd'
import addProjectWorker from './addProjectWorker'
import contractorAdmin from './contractorAdmin'
import projectAdminSelect from '../../advancedFilter-components/projectAdminSelect'
import projectAdminList from './components/projectAdminList'
import config from '@/config'
import clonedeep from 'clonedeep'
import {aesDecrypt} from '@/libs/util'
import listSelecTimplement from '_c/listSelecTimplement'
export default({
  components: {
    editableTables,
    projectAdd,
    addProjectWorker,
    projectAdminSelect,
    contractorAdmin,
    projectAdminList,
    listSelecTimplement
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
              }),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginTop: '5px',
                  marginBottom: '5px'
                },
                on: {
                  click: () => {
                    this.modalTrain = true
                    this.getWorkerPageList(params.row.projectCode)
                  }
                }
              }, '添加培训资料')
            ])
          }
        }
      ],
      formInline: {
        trainingDate: '',
        trainingDuration: '',
        trainingName: '',
        trainingTypeCode: '',
        trainer: '',
        trainingOrg: '',
        trainingAddress: '',
        description: '',
        attachments: '',
        accessoryName: '',
        accessoryData: '',
        radioState: ''
      },
      ruleInline: {
        trainingDate: [
          { required: true, type: 'date', message: '请选择时间', trigger: 'blur' }
        ],
        trainingDuration: [
          { required: true, message: '培训时长不能为空', trigger: 'blur' }
        ],
        trainingName: [
          { required: true, message: '培训名称不能为空', trigger: 'blur' }
        ],
        trainingTypeCode: [
          { required: true, message: '培训类型不能为空', trigger: 'change' }
        ]
      },
      formInlineProject: {
        projectCode: '',
        mainboardNum: ''
      },
      ruleInlineProject: {
        projectCode: [
          { required: true, message: '项目编码', trigger: 'blur' }
        ],
        mainboardNum: [
          { required: true, message: '主板编号', trigger: 'blur' }
        ]
      },
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
      showWorker: false,
      modalTrain: false,
      configUrl: config.baseUrl.pro.replace("http:", ""),
      sumSalarySingle_loading: false,
      listStyle: {
        width: '380px',
        height: '340px'
      },
      transferTitles: ['工人列表', '培训工人列表'],
      workerList: [],
      selectedList: [],
      columnsSelectedWorkerList: [
        {
          title: '姓名',
          key: 'data'
        },
        {
          title: '身份证号',
          key: 'idCardNumber'
        },
        {
          title: '是否合格',
          key: 'isPass',
          render: (h, params) => {
            return (
              <div>
                <i-select value={this.selectedWorkerList[params.index].isPass} on-on-change={this.trainQualified.bind(this, params.index)}>
                  <i-option value="1">是</i-option>
                  <i-option value="0">否</i-option>
                </i-select>
              </div>
            )
          }
        },
        {
          title: '培训得分',
          key: 'trainingScore',
          render: (h, params) => {
            return h('div', [
              h('Input', {
                on: {
                  'on-change': (event) => {
                    this.selectedWorkerList[params.index].trainingScore = event.target.value
                  }
                }
              }),
            ])
          }
        }
      ],
      getWorkerPageListId: '',
      projectAddState: false,
      project_loading: false,
      projectState:false,
      projectExist: false
    }
  },
  computed: {
    selectedWorkerList () {
      let list = []
      this.selectedList.forEach(item => {
        list.push({
          data: item.data.split(':')[1].split(' ')[0],
          idCardNumber: item.data.split(':')[2],
          trainingScore: '',
          isPass: '',
          wId: item.value
        })
      })
      return list
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

    },
    fileSuccess (response, file, fileList) {
      this.formInline.accessoryData = response.info
    },
    handleBeforeUpload () {
      let check = this.formInline.accessoryData === ''
      if (this.formInline.accessoryData) {
        this.$Notice.warning({
          title: `最多支持上传1张文件！`
        })
      }
      return check
    },
    onFormat (file) {
      this.$Notice.warning({
        title: `文件${file.name}格式不正确`
      })
    },
    // 删除已上传
    onRemoveList (file, fileList) {
      this.formInline.accessoryData = ''
    },
    // 取消
    cancelGrant () {

    },
    // 是否上传附件
    radioStateChange (e) {
      if (e + '' === '1') {
        this.ruleInline.accessoryName = [
          { required: true, message: '附件名称不能为空', trigger: 'blur' }
        ]
        this.ruleInline.accessoryData = [
          { required: true, message: '文件不能为空', trigger: 'blur' }
        ]
      } else {
        delete this.ruleInline.accessoryName
        delete this.ruleInline.accessoryData
      }
    },
    // 判断培训人员是否为空
    trainJudge (obj) {
      if (obj && obj.length !== 0) {
        let state = false
        obj.forEach(item => {
          for (let key in item) {
            console.log(!item[key])
            console.log(item[key])
            if (!item[key]) {
              state = false
              return
            }
          }
          state = true
        })
        return state
      } else {
        return false
      }
    },
    // 培训资料上传
    accessorySubmit (name) {
      this.$refs.formInline.validate((valid) => {
        this.sumSalarySingle_loading = true
        if (valid) {
          try {
            if (this.trainJudge(this.selectedWorkerList)) {
              let data = clonedeep(this.formInline)
              if (data.accessoryName) {
                data.attachments = []
                data.attachments.push({
                  name: data.accessoryName,
                  data: data.accessoryData
                })
              } else {
                data.attachments = []
              }
              data.projectCode = this.getWorkerPageListId
              data.workers = this.selectedWorkerList
              data.trainingDate = new Date(data.trainingDate).Format("yyyy-MM-dd")
              trainAdd(data).then(res => {
                this.sumSalarySingle_loading = false
                this.modalTrain = false
                this.$Message.success('成功')
              }).catch(err => {
                this.sumSalarySingle_loading = false
                this.modalTrain = true
                this.$Message.error(err)
              })
            } else {
              this.$Message.error('请完善培训工人信息')
              this.modalTrain = true
              this.sumSalarySingle_loading = false
            }
          } catch(e) {
            this.modalTrain = true
            this.sumSalarySingle_loading = false
            this.$Message.error('失败请联系管理员')
          }
        } else {
          this.$Message.error('请完善信息')
          this.modalTrain = true
          this.sumSalarySingle_loading = false
        }
      })
    },
    getWorkerPageList (projectCode) {
      this.workerList = []
      this.getWorkerPageListId = projectCode
      workerGetPageList(projectCode).then(res => {
        this.workerList = []
        try {
          res.info.data.forEach(item => {
            this.workerList.push({
              value: item.id,
              data: `姓名:${item.workerName} 身份证号:${aesDecrypt(item.idCardNumber)}`,
            })
          })
        } catch (e) {
          console.log(e)
        }
        console.log(this.workerList)
      }).catch(err => {

      })
    },
    // 选择培训是否合格
    trainQualified (index, e) {
      this.selectedWorkerList[index].isPass = e
    },
    // 查询项目是否存在
    blurProject (e) {
      console.log(e.target.value)
      this.projectState = true
      projectQuery(e.target.value).then(res => {
         this.projectState = false
         this.projectExist = true
      }).catch(err => {
        this.$Message.error(err)
        this.projectState = false
        this.projectExist = false
      })
    },
    cancelProject () {
      this.$refs.formInlineProject.resetFields()
      this.projectAddState = false
      this.project_loading = false
      this.projectState = false
      this.projectExist = false
    },
    cancelProjectInit () {
      this.$refs.formInlineProject.resetFields()
      this.projectState = false
      this.projectExist = false
      this.projectAddState = true
    },
    projectSubmit() {
      this.project_loading = true
      this.$refs.formInlineProject.validate((valid) => {
        if (valid) {
          projectAddMainboardNum(this.formInlineProject.mainboardNum, this.formInlineProject.projectCode).then(res => {
            this.$Message.success('成功')
            this.project_loading = false
            this.projectAddState = false
          }).catch(err => {
            console.log(err)
            this.project_loading = false
          })
        } else {
          this.$Message.error('失败')
          this.project_loading = false
        }
      })
    }
  },
  mounted () {
    // 初始化管理员列表
    this.getList()
  }
})
</script>
<style scoped>
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
