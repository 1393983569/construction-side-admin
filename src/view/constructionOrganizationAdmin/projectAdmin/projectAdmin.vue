<template>
  <div>
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
        <FormItem prop="workerNum" label="培训名称">
          <Input type="text" v-model="formInline.workerNum" style="width: 250px" placeholder="培训名称"></Input>
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
      <Transfer
        :data="workerList"
        :target-keys="targetKeys"
        :list-style="listStyle"
        :titles="transferTitles"
        filterable
        @on-change="handleChange"
        ></Transfer>
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
import { getPageList, workerGetPageList } from '@/api/constructionOrganizationAdmin/projectAdmin/projectAdmin'
import projectAdd from './projectAdd'
import addProjectWorker from './addProjectWorker'
import contractorAdmin from './contractorAdmin'
import projectAdminSelect from '../../advancedFilter-components/projectAdminSelect'
import projectAdminList from './components/projectAdminList'
import config from '@/config'
import clonedeep from 'clonedeep'
import {aesDecrypt} from '@/libs/util'
export default({
  components: {
    editableTables,
    projectAdd,
    addProjectWorker,
    projectAdminSelect,
    contractorAdmin,
    projectAdminList
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
                  marginTop: '5px'
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
      workerList: []
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
    // 培训资料上传
    accessorySubmit (name) {
      this.$refs.formInline.validate((valid) => {
        if (valid) {
          try {
            let data = clonedeep(this.formInline)
            if (data.accessoryName) {
              data.attachments = []
              data.attachments.push({
                name: data.accessoryName,
                data: data.accessoryData
              })
            }
            console.log(data)
            trainAdd().then(res => {
              console.log(res)
            }).catch(err => {
              console.log(err)
            })
          } catch(e) {
            console.log(e)
          }
        } else {
          this.$Message.error('请完善信息')
        }
      })
    },
    getWorkerPageList (projectCode) {
      this.workerList = []
      workerGetPageList(projectCode).then(res => {
        this.workerList = []
        try {
          res.info.data.forEach(item => {
            this.workerList.push({
              key: item.id,
              label: `姓名:${item.workerName} 身份证号:${aesDecrypt(item.idCardNumber)}`
            })
          })
        } catch (e) {
          console.log(e)
        }
        console.log(this.workerList)
      }).catch(err => {

      })
    },
    handleChange (newTargetKeys) {
      this.targetKeys = newTargetKeys
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
