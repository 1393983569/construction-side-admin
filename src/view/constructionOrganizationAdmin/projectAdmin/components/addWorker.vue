<template>
  <!-- 添加数据 -->
  <div class="password">
    <!--身份证读取-->
    <idCard @getData="getCallData"></idCard>
    <Form ref="formValidate" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="workerName" label="工人姓名">
        <Input type="text" v-model="formInline.workerName" style="width: 250px" placeholder="工人姓名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="idCardNumber" label="证件号码">
        <Input type="text" v-model="formInline.idCardNumber"  style="width: 250px" placeholder="证件号码">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="nation" label="民族">
        <Input type="text" v-model="formInline.nation"  style="width: 250px" placeholder="民族">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="nation" label="住址">
        <Input type="text" v-model="formInline.address"  style="width: 250px" placeholder="住址">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="grantOrg" label="发证机关">
        <Input type="text" v-model="formInline.grantOrg"  style="width: 250px" placeholder="发证机关">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="startDate" label="证件有效期开始日期">
        <Input type="text" v-model="formInline.startDate"  style="width: 250px" placeholder="证件有效期开始日期">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="startDate" label="证件有效期结束日期">
        <Input type="text" v-model="formInline.expiryDate"  style="width: 250px" placeholder="证件有效期结束日期">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="workType" label="当前工种">
        <Input type="text" v-model="formInline.workType" style="width: 250px" placeholder="当前工种">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="workRole" label="工人类型">
        <Input type="text" v-model="formInline.workRole" style="width: 250px" placeholder="工人类型">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="issueCardDate" label="发卡时间">
        <Input type="text" v-model="formInline.issueCardDate" style="width: 250px" placeholder="投资规模">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="cardNumber" label="考勤卡号">
        <Input type="text" v-model="formInline.cardNumber"  style="width: 250px" placeholder="考勤卡号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="payRollBankCardNumber" label="发放工资银行卡号">
        <Input type="text" v-model="formInline.payRollBankCardNumber"  style="width: 250px" placeholder="发放工资银行卡号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="payRollBankName" label="发放工资银行名称">
        <Input type="text" v-model="formInline.payRollBankName"  style="width: 250px" placeholder="发放工资银行名称">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="bankLinkNumber" label="发放工资卡银行联号">
        <Input type="text" v-model="formInline.bankLinkNumber"  style="width: 250px" placeholder="发放工资卡银行联号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="payRollTopBankCode" label="发放工资卡银行">
        <Input type="text" v-model="formInline.payRollTopBankCode"  style="width: 250px" placeholder="发放工资卡银行">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="hasBuyInsurance" label="是否购买工伤或意外伤害保险">
        <Input type="text" v-model="formInline.hasBuyInsurance"  style="width: 250px" placeholder="是否购买工伤或意外伤害保险">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="politicsType" label="政治面貌">
        <Input type="text" v-model="formInline.politicsType"  style="width: 250px" placeholder="政治面貌">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="joinedTime" label="加入工会时间">
        <Input type="text" v-model="formInline.joinedTime"  style="width: 250px" placeholder="加入工会时间">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="cellPhone" label="手机号码">
        <Input type="text" v-model="formInline.cellPhone"  style="width: 250px" placeholder="手机号码">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="cultureLevelType" label="文化程度">
        <Input type="text" v-model="formInline.cultureLevelType"  style="width: 250px" placeholder="文化程度">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="Specialty" label="特长">
        <Input type="text" v-model="formInline.Specialty"  style="width: 250px" placeholder="特长">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="hasBadMedicalHistory" label="是否有重大病史">
        <Input type="text" v-model="formInline.hasBadMedicalHistory"  style="width: 250px" placeholder="是否有重大病史">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="urgentLinkMan" label="紧急联系人姓名">
        <Input type="text" v-model="formInline.urgentLinkMan"  style="width: 250px" placeholder="特长">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="urgentLinkManPhone" label="紧急联系方式">
        <Input type="text" v-model="formInline.urgentLinkManPhone"  style="width: 250px" placeholder="紧急联系方式">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="workDate" label="开始工作日期">
        <Input type="text" v-model="formInline.workDate"  style="width: 250px" placeholder="开始工作日期">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="maritalStatus" label="婚姻状况">
        <Input type="text" v-model="formInline.maritalStatus"  style="width: 250px" placeholder="婚姻状况">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="isTeamLeader" label="是否班组长">
        <RadioGroup v-model="formInline.isTeamLeader">
          <Radio label="1">是</Radio>
          <Radio label="0">否</Radio>
        </RadioGroup>
      </FormItem>
      <div>
        <FormItem prop="headImage" label="头像">
          <div style=" clear:both"></div>
          <uploadMultiple v-model="formInline.headImage"/>
        </FormItem>
        <FormItem prop="issueCardPic" label="办卡采集相片">
          <div style=" clear:both"></div>
          <uploadMultiple v-model="formInline.issueCardPic"/>
        </FormItem>
        <FormItem prop="positiveIDCardImage" label="正面照" style="display: inline-block;">
          <div style=" clear:both"></div>
          <uploadMultiple v-model="formInline.positiveIDCardImage"/>
        </FormItem>
        <FormItem prop="negativeIDCardImage" label="反面照" style="display: inline-block">
          <div style=" clear:both"></div>
          <uploadMultiple v-model="formInline.negativeIDCardImage"/>
        </FormItem>
      </div>
    </Form>
  </div>
</template>

<script>
  import siteSelect from '_c/siteSelect/siteSelect.vue'
  import { getAdminsList } from '@/api/login/checkIn/fillInTheForm'
  import idCard from '_c/idCard'
  import { cultureLevelType, workerType, importFile } from '@/api/public'
  import uploadMultiple from '_c/uploadMultiple'
  export default {
    components: {
      siteSelect,
      idCard,
      uploadMultiple
    },
    data () {
      // const validaAccountPhone = (rule, value, callback) => {
      //   if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
      //     callback(new Error('请输入正确的手机号'))
      //   } else {
      //     callback()
      //   }
      // }
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
          workerName: '',
          isTeamLeader: '',
          idCardNumber: '',
          workType: '',
          workRole: '',
          issueCardDate: '',
          issueCardPic: '',
          cardNumber: '',
          payRollBankCardNumber: '',
          payRollBankName: '',
          bankLinkNumber: '',
          payRollTopBankCode: '',
          hasBuyInsurance: '',
          nation: '',
          address: '',
          headImage: '',
          politicsType: '',
          joinedTime: '',
          cellPhone: '',
          cultureLevelType: '',
          Specialty: '',
          hasBadMedicalHistory: '',
          urgentLinkMan: '',
          urgentLinkManPhone: '',
          workDate: '',
          maritalStatus: '',
          grantOrg: '',
          positiveIDCardImage: '',
          negativeIDCardImage: '',
          startDate: '',
          expiryDate: ''
        },
        ruleInline: {
          workerName: [
            { required: true, message: '工人姓名不能为空', trigger: 'blur' }
          ],
          isTeamLeader: [
            { required: true, message: '请选择是否班组长', trigger: 'change' }
          ],
          idCardNumber: [
            { validator: identityCard, trigger: 'blur' },
            { required: true, message: '证件号码不能为空', trigger: 'blur' }
          ],
          workType: [
            { required: true, message: '当前工种不能为空', trigger: 'blur' }
          ]
        },
        loading: false,
        selectListBank: [],
        cultureLevelTypeList: [],
        workerTypeList: [],

      }
    },
    props: {
      dLoginNameValue: {
        type: String,
        default: ''
      }
    },
    methods: {
      async getDictionaries () {
        try {
          this.workerTypeList = await workerType().then().catch()
          this.cultureLevelTypeList = await cultureLevelType().then().catch()
        } catch (e) {
          console.log(e)
        }
      },
      async getCallData (e) {
        try {
          let imgUrl = await importFile(e.imgValue).then().catch()
          console.log(imgUrl.info.split('/'))
          this.formInline.workerName = e.name
          this.formInline.idCardNumber = e.cardno
          this.formInline.nation = e.nation
          this.formInline.address = e.address
          this.formInline.headImage = imgUrl.info.split('/')[3]
          this.formInline.startDate = e.userlifebValue
          this.formInline.expiryDate = e.userlifeeValue
          this.formInline.startDate = e.police
        } catch (e) {
          console.log(e)
        }
      },
      handleSubmit () {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            this.$Message.success('Success!')
          } else {
            this.$Message.error('Fail!')
          }
        })
      }
    },
    mounted () {
      //
    }
  }
</script>

<style scoped>

</style>
