<template>
  <!-- 添加数据 -->
  <div class="password">
    <Form inline ref="formInline" style="width: 900px; height: 600px" :model="formInline" :rules="ruleInline" >
      <FormItem prop="corpCode" label="社会信用代码或织机构代码(选其一)" style="width: 210px">
        <Input type="text" v-model="formInline.corpCode" placeholder="请输入"></Input>
      </FormItem>
      <FormItem prop="corpName" label="企业名称"  style="width: 200px">
        <Input type="text" v-model="formInline.corpName" placeholder="企业名称"></Input>
      </FormItem>
      <FormItem prop="corpType" label="单位性质" style="width: 200px">
        <Select v-model="formInline.corpType" style="width:200px">
          <Option v-for="item in constructionList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="licenseNum" label="工商营业执照注册号" style="width: 200px">
        <Input type="text" v-model="formInline.licenseNum" placeholder="工商营业执照注册号"></Input>
      </FormItem>
      <FormItem prop="areaCode" label="企业注册地区" style="width: 200px">
        <siteSelect v-model="formInline.areaCode"></siteSelect>
      </FormItem>
      <FormItem prop="zipCode" label="邮政编码" style="width: 200px">
        <Input type="text" v-model="formInline.zipCode" placeholder="邮政编码"></Input>
      </FormItem>
      <FormItem prop="legalMan" label="法定代表人姓名" style="width: 200px">
        <Input type="text" v-model="formInline.legalMan" placeholder="法定代表人姓名"></Input>
      </FormItem>
      <FormItem prop="legalManDuty" label="法定代表人职务" style="width: 200px">
        <Input type="text" v-model="formInline.legalManDuty" placeholder="法定代表人职务"></Input>
      </FormItem>
      <FormItem prop="legaManProTitle" label="法定代表人职称" style="width: 200px">
        <Input type="text" v-model="formInline.legaManProTitle" placeholder="法定代表人职称"></Input>
      </FormItem>
      <!--<FormItem prop="legalManIDCardType" label="法定代表人证件类型" style="width: 200px">-->
        <!--<Input type="text" v-model="formInline.legalManIDCardType" placeholder="法定代表人证件类型">-->
          <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
        <!--</Input>-->
      <!--</FormItem>-->
      <FormItem prop="legalManIDCardNumber" label="法定代表人证件号码" style="width: 200px">
        <Input type="text" v-model="formInline.legalManIDCardNumber" placeholder="法定代表人证件号码"></Input>
      </FormItem>
      <FormItem prop="regCapital" label="注册资本（万元）" style="width: 200px">
        <Input type="text" v-model="formInline.regCapital" placeholder="注册资本(万元)"></Input>
      </FormItem>
      <FormItem prop="factRegCapital" label="实收资本(万元)" style="width: 200px">
        <Input type="text" v-model="formInline.factRegCapital" placeholder="实收资本(万元)"></Input>
      </FormItem>
      <!--<FormItem prop="capitalCurrencyType" label="注册资本币种" style="width: 200px">-->
        <!--<Input type="text" v-model="formInline.capitalCurrencyType" placeholder="注册资本币种">-->
          <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
        <!--</Input>-->
      <!--</FormItem>-->
      <FormItem prop="registerDate" label="注册日期" style="width: 200px">
        <DatePicker v-model="formInline.registerDate" type="date" placeholder="注册日期"></DatePicker>
      </FormItem>
      <FormItem prop="establishDate" label="成立日期" style="width: 200px">
        <DatePicker v-model="formInline.establishDate" type="date" placeholder="成立日期"></DatePicker>
      </FormItem>
      <FormItem prop="officePhone" label="办公电话" style="width: 200px">
        <Input type="text" v-model="formInline.officePhone" placeholder="办公电话"></Input>
      </FormItem>
      <FormItem prop="faxNumber" label="传真号码" style="width: 200px">
        <Input type="text" v-model="formInline.faxNumber" placeholder="传真号码"></Input>
      </FormItem>
      <FormItem prop="linkman" label="联系人姓名" style="width: 200px">
        <Input type="text" v-model="formInline.linkman" placeholder="联系人姓名"></Input>
      </FormItem>
      <FormItem prop="linkTel" label="联系人办公电话" style="width: 200px">
        <Input type="text" v-model="formInline.linkTel" placeholder="联系人办公电话"></Input>
      </FormItem>
      <FormItem prop="email" label="企业联系邮箱" style="width: 200px">
        <Input type="text" v-model="formInline.email" placeholder="企业联系邮箱"></Input>
      </FormItem>
      <FormItem prop="website" label="企业网址" style="width: 200px">
        <Input type="text" v-model="formInline.website" placeholder="企业网址"></Input>
      </FormItem>
      <FormItem prop="remark" label="企业备注" style="width: 200px">
        <Input type="text" v-model="formInline.remark" placeholder="企业备注"></Input>
      </FormItem>
      <FormItem prop="address" label="企业营业地址" style="width: 200px">
        <Input type="text" v-model="formInline.address" placeholder="企业营业地址"></Input>
      </FormItem>
      <FormItem prop="appId" label="AppId" style="width: 200px">
        <Input type="text" v-model="formInline.appId" placeholder="AppId"></Input>
      </FormItem>
      <FormItem prop="secretKey" label="秘钥" style="width: 200px">
        <Input type="text" v-model="formInline.secretKey" placeholder="秘钥"></Input>
      </FormItem>
      <!--<FormItem prop="deptAddr" label="单位详细地址" style="width: 200px">-->
        <!--<Input type="text" v-model="formInline.deptAddr" placeholder="单位详细地址">-->
          <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
        <!--</Input>-->
      <!--</FormItem>-->
      <!--<FormItem prop="deptPhone" label="单位电话">-->
        <!--<Input type="text" v-model="formInline.deptPhone" placeholder="单位电话">-->
          <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
        <!--</Input>-->
      <!--</FormItem>-->
      <!--<FormItem prop="allowPic" label="营业执照">-->
        <!--&lt;!&ndash; 清除浮动 &ndash;&gt;-->
        <!--<div style="display: block; clear:both"></div>-->
        <!--<qiniu-img style="display: block;" :typeCustom='"default"' @updateImg="updateImg">-->
          <!--上传图片-->
        <!--</qiniu-img>-->
        <!--<clickImg :rePic='formInline.allowPic' @closeClick="closeClick"></clickImg>-->
      <!--</FormItem>-->
      <FormItem style="display: block">
        <Button type="primary" :loading="loading" @click="handleSubmit('formInline')">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import './checkIn.less'
import siteSelect from '_c/siteSelect/siteSelect.vue'
import qiniuImg from '_c/qiniu-img/'
import clickImg from '_c/clickImg'
import { add, getAdminsList, getAreaCodeList } from '@/api/login/checkIn/fillInTheForm'
import { projectPropertyConstruction } from '@/api/public'
export default {
  components: {
    siteSelect,
    qiniuImg,
    clickImg
  },
  data () {
    const validaAccountPhone = (rule, value, callback) => {
      if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      formInline: {
        corpCode: '',
        corpName: '',
        corpType: '',
        licenseNum: '',
        areaCode: [],
        address: '',
        zipCode: '',
        legalMan: '',
        legalManDuty: '',
        legaManProTitle: '',
        // legalManIDCardType: '',
        legalManIDCardNumber: '',
        regCapital: '',
        factRegCapital: '',
        // capitalCurrencyType: '',
        registerDate: '',
        establishDate: '',
        officePhone: '',
        faxNumber: '',
        linkman: '',
        linkTel: '',
        email: '',
        website: '',
        remark: ''
      },
      ruleInline: {
        corpCode: [
          { required: true, message: '织机构代码或社会信用代码不能为空', trigger: 'blur' }
        ],
        corpName: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' }
        ],
        areaCode: [
          { required: true, type: 'array', message: '企业注册地区编码', trigger: 'blur' }
        ],
        appId: [
          { required: true, message: 'AppId不能为空', trigger: 'blur' }
        ],
        secretKey: [
          { required: true, message: '秘钥不能为空', trigger: 'blur' }
        ]
      },
      loading: false,
      bankList: [],
      buildList: [],
      constructionList: []
    }
  },
  props: {
    dLoginNameValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleSubmit (name) {
      this.loading = true
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.formInline.dLoginName = this.dLoginNameValue
          // 处理时间格式
          this.formInline.registerDate = this.formInline.registerDate ? new Date(this.formInline.registerDate).Format("yyyy-MM-dd") : ''
          this.formInline.establishDate = this.formInline.establishDate ? new Date(this.formInline.establishDate).Format("yyyy-MM-dd") : ''
          console.log(this.formInline)
          add(this.formInline).then(res => {
            this.loading = false
            this.$emit('formSuccess', true)
          }).catch(err => {
            this.loading = false
            this.$Message.error(err)
          })
        } else {
          this.loading = false
          this.$Message.error('请完善信息')
      }
      })
    },
    updateImg (img) {
      this.formInline.allowPic.push(img)
    },
    closeClick (index) {
      this.formInline.allowPic.splice(index, 1)
    },
    async getSelectList () {
      try {
        let bank = await getAdminsList(3).then().catch()
        let build = await getAdminsList(4).then().catch()
        this.bankList = bank.info
        this.buildList = build.info
      } catch (e) {
        console.log(e)
      }
    },
    getConstructionList () {
      this.constructionList = []
      projectPropertyConstruction().then(res => {
        this.constructionList = []
        this.constructionList.push(...res.info)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getConstructionList()
  }
}
</script>

<style scoped>

</style>
