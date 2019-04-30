<template>
  <!-- 添加数据 -->
  <div class="password">
    <!--身份证读取-->
    <idCard @getData="getCallData"></idCard>
    <Form ref="formValidate" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="workerName" label="工人姓名">
        <Input type="text" v-model="formInline.workerName" style="width: 250px" placeholder="工人姓名">
        </Input>
      </FormItem>
      <FormItem prop="idCardNumber" label="证件号码">
        <Input type="text" v-model="formInline.idCardNumber"  style="width: 250px" placeholder="证件号码">
        </Input>
      </FormItem>
      <FormItem prop="nation" label="民族">
        <Input type="text" v-model="formInline.nation"  style="width: 250px" placeholder="民族">

        </Input>
      </FormItem>
      <FormItem prop="nation" label="住址">
        <Input type="text" v-model="formInline.address"  style="width: 250px" placeholder="住址">

        </Input>
      </FormItem>
      <FormItem prop="birthday" label="出生日期">
        <DatePicker type="date" placeholder="开始工作日期" v-model="formInline.birthday" style="width: 250px"></DatePicker>
      </FormItem>
      <FormItem prop="grantOrg" label="发证机关">
        <Input type="text" v-model="formInline.grantOrg"  style="width: 250px" placeholder="发证机关">

        </Input>
      </FormItem>
      <FormItem prop="startDate" label="证件有效期开始日期">
        <DatePicker type="date" placeholder="证件有效期开始日期" v-model="formInline.startDate" style="width: 250px"></DatePicker>
      </FormItem>
      <FormItem prop="startDate" label="证件有效期结束日期">
        <DatePicker type="date" placeholder="证件有效期结束日期" v-model="formInline.expiryDate" style="width: 250px"></DatePicker>
      </FormItem>
         <FormItem prop="gender" label="性别">
        <Select v-model="formInline.gender" style="width:250px" placeholder="性别">
          <Option  value="男">男</Option>
          <Option  value="女">女</Option>
        </Select>
      </FormItem>
      <FormItem prop="workType" label="当前工种">
        <Select v-model="formInline.workType" style="width:250px" placeholder="当前工种">
          <Option v-for="item in workerTypeList.info" :value="item.tid + ''" :key="item.tid">{{ item.profession }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="workRole" label="工人类型">
        <Select v-model="formInline.workRole" style="width:250px" placeholder="工人类型">
          <Option v-for="(item, index) in workRoleList.info" :value="item.id + ''" :key="index">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="issueCardDate" label="发卡时间">
        <DatePicker type="date" placeholder="发卡时间" v-model="formInline.issueCardDate" style="width: 250px"></DatePicker>
        <!-- <Input type="text" v-model="formInline.issueCardDate" style="width: 250px" placeholder="投资规模">

        </Input> -->
      </FormItem>
      <FormItem prop="cardNumber" label="考勤卡号">
        <Input type="text" v-model="formInline.cardNumber"  style="width: 250px" placeholder="考勤卡号">

        </Input>
      </FormItem>
      <FormItem prop="payRollBankCardNumber" label="发放工资银行卡号">
        <Input type="text" v-model="formInline.payRollBankCardNumber"  style="width: 250px" placeholder="发放工资银行卡号">

        </Input>
      </FormItem>
      <FormItem prop="payRollBankName" label="发放工资银行名称">
        <Input type="text" v-model="formInline.payRollBankName"  style="width: 250px" placeholder="发放工资银行名称">

        </Input>
      </FormItem>
      <FormItem prop="bankLinkNumber" label="发放工资卡银行联号">
        <Input type="text" v-model="formInline.bankLinkNumber"  style="width: 250px" placeholder="发放工资卡银行联号">

        </Input>
      </FormItem>
      <!-- <FormItem prop="payRollTopBankCode" label="发放工资卡银行">
        <Input type="text" v-model="formInline.payRollTopBankCode"  style="width: 250px" placeholder="发放工资卡银行">

        </Input>
      </FormItem> -->
      <FormItem prop="politicsType" label="政治面貌">
         <Select v-model="formInline.politicsType" style="width:250px" placeholder="政治面貌">
          <Option v-for="item in politicsTypeList.info" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="joinedTime" label="加入工会时间">
        <DatePicker type="date" placeholder="开始工作日期" v-model="formInline.joinedTime" style="width: 250px"></DatePicker>
        <!--<Input type="text" v-model="formInline.joinedTime"  style="width: 250px" placeholder="加入工会时间">-->
          <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
        <!--</Input>-->
      </FormItem>
      <FormItem prop="cellPhone" label="手机号码">
        <Input type="text" v-model="formInline.cellPhone"  style="width: 250px" placeholder="手机号码">

        </Input>
      </FormItem>
      <FormItem prop="cultureLevelType" label="文化程度">
        <Select v-model="formInline.cultureLevelType" style="width:250px" placeholder="文化程度">
          <Option v-for="item in cultureLevelTypeList.info" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="specialty" label="特长">
        <Input type="text" v-model="formInline.specialty"  style="width: 250px" placeholder="特长">

        </Input>
      </FormItem>
      <FormItem prop="urgentLinkMan" label="紧急联系人姓名">
        <Input type="text" v-model="formInline.urgentLinkMan"  style="width: 250px" placeholder="紧急联系人姓名">

        </Input>
      </FormItem>
      <FormItem prop="urgentLinkManPhone" label="紧急联系方式">
        <Input type="text" v-model="formInline.urgentLinkManPhone"  style="width: 250px" placeholder="紧急联系方式">

        </Input>
      </FormItem>
      <FormItem prop="workDate" label="开始工作日期">
        <DatePicker type="date" placeholder="开始工作日期" v-model="formInline.workDate" style="width: 250px"></DatePicker>
      </FormItem>
      <FormItem prop="maritalStatus" label="婚姻状况">
        <Select v-model="formInline.maritalStatus" style="width:250px" placeholder="婚姻状况">
          <Option  value="01">未婚</Option>
          <Option  value="02">已婚</Option>
          <Option  value="03">离异</Option>
          <Option  value="04">丧偶</Option>
        </Select>
      </FormItem>
      <FormItem prop="hasBadMedicalHistory" label="是否有重大病史">
        <RadioGroup v-model="formInline.hasBadMedicalHistory">
          <Radio label="1">是</Radio>
          <Radio label="0">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem prop="isTeamLeader" label="是否班组长">
        <RadioGroup v-model="formInline.isTeamLeader">
          <Radio label="1">是</Radio>
          <Radio label="0">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem prop="hasBuyInsurance" label="是否购买工伤或意外伤害保险">
        <RadioGroup v-model="formInline.hasBuyInsurance">
          <Radio label="1">是</Radio>
          <Radio label="0">否</Radio>
        </RadioGroup>
      </FormItem>
      <!--<FormItem prop="hasBuyInsurance" label="是否购买工伤或意外伤害保险">-->
        <!--<Input type="text" v-model="formInline.hasBuyInsurance"  style="width: 250px" placeholder="是否购买工伤或意外伤害保险">-->
          <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
        <!--</Input>-->
      <!--</FormItem>-->
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
  import { workerAdd, workerEdit } from '@/api/constructionOrganizationAdmin/workerAdmin/addContract'
  import idCard from '_c/idCard'
  import { cultureLevelType, workerType, importFile, workRole, politicsType } from '@/api/public'
  import uploadMultiple from '_c/uploadMultiple'
  import clonedeep from 'clonedeep'
  import { getAges, aesDecrypt } from '@/libs/util'
  export default {
    components: {
      siteSelect,
      idCard,
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
          specialty: '',
          hasBadMedicalHistory: '',
          urgentLinkMan: '',
          urgentLinkManPhone: '',
          workDate: '',
          maritalStatus: '',
          grantOrg: '',
          positiveIDCardImage: '',
          negativeIDCardImage: '',
          startDate: '',
          expiryDate: '',
          birthday: '',
          gender: ''
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
            { required: true, message: '当前工种不能为空', trigger: 'change' }
          ],
          workRole: [
            { required: true, message: '工人类型不能为空', trigger: 'change' }
          ],
          nation: [
            { required: true, message: '民族不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '住址不能为空', trigger: 'blur' }
          ],
          headImage: [
            { required: true, message: '头像不能为空', trigger: 'change' }
          ],
          politicsType: [
            { required: true, message: '政治面貌不能为空', trigger: 'change' }
          ],
          cellPhone: [
            { required: true, message: '手机号码不能为空', trigger: 'blur' },
            { validator: validaAccountPhone, trigger: 'blur' },
          ],
          cultureLevelType: [
            { required: true, message: '文化程度不能为空', trigger: 'blur' }
          ],
          grantOrg: [
            { required: true, message: '发证机关不能为空', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '性别不能为空', trigger: 'blur' }
          ]
        },
        loading: false,
        selectListBank: [],
        cultureLevelTypeList: [],
        workerTypeList: [],
        workRoleList: [],
        politicsTypeList: []
      }
    },
    props: {
      projectCorpId: {
        type: String
      },
      row: {
        type: Object
      },
      apiState: {
        type: Boolean
      }
    },
    methods: {
      // 获得数据字典
      async getDictionaries () {
        try {
          this.workerTypeList = await workerType().then().catch()
          this.cultureLevelTypeList = await cultureLevelType().then().catch()
          this.workRoleList = await workRole().then().catch()
          this.politicsTypeList = await politicsType().then().catch()
        } catch (e) {
          console.log(e)
        }
      },
      // 读取身份证赋值
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
          this.formInline.grantOrg = e.police
          this.formInline.birthday = e.bornDate
          this.formInline.age = getAges(e.bornDate)
          console.log(this.formInline.age)
        } catch (e) {
          console.log(e)
        }
      },
      // 提交表单
      handleSubmit () {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            let formInlineNew = clonedeep(this.formInline)
            try {
              formInlineNew.projectCropTeamId = this.projectCorpId + ''
              formInlineNew.startDate = formInlineNew.startDate ? new Date(formInlineNew.startDate).Format("yyyy-MM-dd") : ''
              formInlineNew.expiryDate = formInlineNew.expiryDate ? new Date(formInlineNew.expiryDate).Format("yyyy-MM-dd") : ''
              formInlineNew.birthday = formInlineNew.birthday ? new Date(formInlineNew.birthday).Format("yyyy-MM-dd") : ''
              if (formInlineNew.joinedTime) formInlineNew.joinedTime = formInlineNew.joinedTime ? new Date(formInlineNew.joinedTime).Format("yyyy-MM-dd") : ''
              if (formInlineNew.issueCardDate) formInlineNew.issueCardDate = formInlineNew.issueCardDate ? new Date(formInlineNew.issueCardDate).Format("yyyy-MM-dd") : ''
              if (formInlineNew.workDate) formInlineNew.workDate = formInlineNew.workDate ? new Date(formInlineNew.workDate).Format("yyyy-MM-dd") : ''
              if (formInlineNew.issueCardPic) formInlineNew.issueCardPic = this.judgeAddUrl(formInlineNew.issueCardPic)
              if (formInlineNew.headImage) formInlineNew.headImage = this.judgeAddUrl(formInlineNew.headImage)
              if (formInlineNew.positiveIDCardImage) formInlineNew.positiveIDCardImage = this.judgeAddUrl(formInlineNew.positiveIDCardImage)
              if (formInlineNew.negativeIDCardImage) formInlineNew.negativeIDCardImage = this.judgeAddUrl(formInlineNew.negativeIDCardImage)
              if (formInlineNew.projectCorpTeamDomain) delete formInlineNew.projectCorpTeamDomain
              if (formInlineNew.headImage && !formInlineNew.headImage.includes('http://')) {
                formInlineNew.headImage = this.addImgBase(formInlineNew.headImage)
              }
              // 判断是否为修改
              if (this.apiState) {
                formInlineNew.wid = this.projectCorpId + ''
                workerEdit(formInlineNew).then(res => {
                  this.$Message.success('修改成功')
                  this.$emit('submitState', true)
                }).catch(err => {
                  this.$Message.error(err)
                  this.$emit('submitState', false)
                })
              } else {
                workerAdd(formInlineNew).then(res => {
                  this.$Message.success('添加成功')
                  this.$emit('submitState', true)
                }).catch(err => {
                  this.$Message.error(err)
                  this.$emit('submitState', false)
                })
              }
            } catch(e) {
              console.log(e)
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
        this.formInline.address = ''
      },
      judgeAddUrl (url) {
        let urlList = []
        let urlString = ''
        if (url.includes(',')) {
          url.split(',').forEath(item => {
            if (item.includes('http')) {
              urlList.push(item)
            } else {
              urlList.push(this.addImgBase(item))
            }
          })
          return urlList.join(',')
        } else {
          if (url.includes('http')) {
            urlString = url
          } else {
            urlString = this.addImgBase(url)
          }
          return urlString
        }
      }
    },
    mounted () {
      //
    },
    watch: {
      row (e) {
        // if (e.payRollBankCardNumber) {
        //   e.payRollBankCardNumber = aesDecrypt(e.payRollBankCardNumber)
        // }
        this.formInline = e
      }
    }
  }
</script>

<style scoped>

</style>
