<template>
  <!-- 添加数据 -->
  <div>
    <Form ref="formValidate" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="days" label="出勤天数(天)">
        <Input type="text" v-model="formInline.days"  style="width: 250px" placeholder="出勤天数">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="workHours" label="总工时(小时)">
        <Input type="text" v-model="formInline.workHours"  style="width: 250px" placeholder="出勤天数">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="payRollBankCardNumber" label="工人工资卡号">
        <Input type="text" v-model="formInline.payRollBankCardNumber"  style="width: 250px" placeholder="工人工资卡号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="payRollBankName" label="工人工资卡开户行名称">
        <Input type="text" v-model="formInline.payRollBankName"  style="width: 250px" placeholder="工人工资卡开户行名称">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="payBankCardNumber" label="工资代发银行卡号">
        <Input type="text" v-model="formInline.payBankCardNumber"  style="width: 250px" placeholder="工资代发银行卡号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="payBankCode" label="工资代发银行代码">
        <Input type="text" v-model="formInline.payBankCode"  style="width: 250px" placeholder="工资代发银行代码">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="payBankName" label="工资代发开户行名称">
        <Input type="text" v-model="formInline.payBankName"  style="width: 250px" placeholder="工资代发开户行名称">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="totalPayAmount" label="应发金额(元)">
        <Input type="text" v-model="formInline.totalPayAmount"  style="width: 250px" placeholder="应发金额">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="actualAmount" label="实发金额(元)">
        <Input type="text" v-model="formInline.actualAmount"  style="width: 250px" placeholder="实发金额">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="thirdPayRollCode" label="第三方工资单编号">
        <Input type="text" v-model="formInline.thirdPayRollCode"  style="width: 250px" placeholder="第三方工资单编号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="isBackPay" label="是否为补发">
        <RadioGroup v-model="formInline.isBackPay" @on-change="isBackPayChange">
          <Radio label="1">是</Radio>
          <Radio label="0">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem prop="backPayMonth" label="补发月份" v-if="isBackPayState">
        <DatePicker type="month" placeholder="补发月份" v-model="formInline.backPayMonth" style="width: 250px"></DatePicker>
      </FormItem>
      <div style="margin-bottom: 5px; color: #adacac">附件</div>
      <div style="border: 1px dashed #dadada; padding: 8px; margin-bottom: 10px">
        <FormItem prop="attachmentsName" label="附件名称">
          <Input type="text" v-model="formInline.attachmentsName"  style="width: 250px" placeholder="附件名称" />
        </FormItem>
        <FormItem prop="attachmentsDate" label="照片" style="display: block">
          <div style=" clear:both"></div>
          <uploadMultiple v-model="formInline.attachmentsDate"/>
        </FormItem>
      </div>
    </Form>
  </div>
</template>

<script>
  import siteSelect from '_c/siteSelect/siteSelect.vue'
  import { add } from '@/api/constructionOrganizationAdmin/workerAdmin/addContract'
  import { cultureLevelType, workerType, importFile, workRole, politicsType } from '@/api/public'
  import uploadMultiple from '_c/uploadMultiple'
  import clonedeep from 'clonedeep'
  import { getAges } from '@/libs/util'

  export default {
    components: {
      siteSelect,
      uploadMultiple
    },
    data () {
      const validaAccountPhone = (rule, value, callback) => {
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      // 效验身份证
      const identityCard = (rule, value, callback) => {
        if (value !== '') {
          if (!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value))) {
            callback(new Error('请输入正确的身份证号码'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
        formInline: {
          days: '',
          workHours: '',
          payRollBankCardNumber: '',
          payRollBankCode: '',
          payRollBankName: '',
          payBankCardNumber: '',
          payBankCode: '',
          payBankName: '',
          totalPayAmount: '',
          actualAmount: '',
          isBackPay: '',
          balanceDate: '',
          backPayMonth: '',
          thirdPayRollCode: '',
          attachmentsName: '',
          attachmentsDate: '',
        },
        ruleInline: {
          days: [
            { required: true, message: '出勤天数不能为空', trigger: 'blur' }
          ],
          workHours: [
            { required: true, message: '总工时不能为空', trigger: 'change' }
          ],
          payRollBankCardNumber: [
            { required: true, message: '工人工资卡号不能为空', trigger: 'change' }
          ],
          payRollBankCode: [
            { required: true, message: '工人工资卡银行代码不能为空', trigger: 'change' }
          ],
          payRollBankName: [
            { required: true, message: '工人工资卡开户行名称不能为空', trigger: 'change' }
          ],
          payBankCardNumber: [
            { required: true, message: '工资代发银行卡号不能为空', trigger: 'change' }
          ],
          payBankName: [
            { required: true, message: '工资代发开户行名称不能为空', trigger: 'change' }
          ],
          actualAmount: [
            { required: true, message: '实发金额不能为空', trigger: 'change' }
          ],
          totalPayAmount: [
            { required: true, message: '应发金额不能为空', trigger: 'change' }
          ],
          isBackPay: [
            { required: true, message: '是否为补发不能为空', trigger: 'change' }
          ],
          thirdPayRollCode: [
            { required: true, message: '第三方工资单编号不能为空', trigger: 'change' }
          ],
          attachmentsName: [
            { required: true, message: '附件名称不能为空', trigger: 'change' }
          ],
          attachmentsDate: [
            { required: true, message: '照片不能为空', trigger: 'change' }
          ]
        },
        loading: false,
        selectListBank: [],
        cultureLevelTypeList: [],
        workerTypeList: [],
        workRoleList: [],
        politicsTypeList: [],
        moreAccessory: false,
        isBackPayState: false
      }
    },
    props: {
      projectCorpId: {
        type: String
      }
    },
    methods: {
      // 获得数据字典
      async getDictionaries () {
        try {
          this.workerTypeList = await workerType().then().catch()
        } catch (e) {
          console.log(e)
        }
      },
      // 提交表单
      handleSubmit () {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            try {
              let data = {
                startDate: this.formInline.startDate,
                endDate: this.formInline.endDate,
                attachments: []
              }
              add(data).then(res => {
                this.$Message.success('添加成功')
                this.$emit('submitState', true)
              }).catch(err => {
                this.$Message.error(err)
                this.$emit('submitState', false)
              })
            } catch(e) {
              this.$emit('submitState', false)
            }
          } else {
            this.$Message.error('请完善信息')
            this.$emit('submitState', false)
          }
        })
      },
      // 清空表单
      handleReset () {
        this.$refs.formValidate.resetFields()
      },
      addMoreAccessory () {
        this.moreAccessory = true
        this.ruleInline.attachmentsTowname = [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
        this.ruleInline.attachmentsTowdata = [
          { required: true, message: '合同照片不能为空', trigger: 'change' }
        ]
      },
      delMoreAccessory () {
        this.moreAccessory = false
        delete this.ruleInline.attachmentsTowname
        delete this.ruleInline.attachmentsTowdata
      },
      isBackPayChange (e) {
        console.log(e)
        if (e + '' === '1') {
          this.ruleInline.backPayMonth = [
            { required: true, type: 'date', message: '生效日期不能为空', trigger: 'change' }
          ]
          console.log(this.ruleInline)
          this.isBackPayState = true
        } else {
          this.isBackPayState = false
          delete this.ruleInline.backPayMonth
        }
      }
    },
    mounted () {
      //
    }
  }
</script>

<style scoped>

</style>
