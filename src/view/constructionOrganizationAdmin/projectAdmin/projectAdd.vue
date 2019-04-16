<template>
  <!-- 添加数据 -->
  <div class="password">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="projectName" label="项目名称">
        <Input type="text" v-model="formInline.projectName" style="width: 250px" placeholder="项目名称">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="chargeName" label="负责人姓名">
        <Input type="text" v-model="formInline.chargeName "  style="width: 250px" placeholder="负责人姓名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="chargePhone" label="负责人电话">
        <Input type="text" v-model="formInline.chargePhone"  style="width: 250px" placeholder="负责人电话">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <!--<FormItem prop="projectNum" label="项目编号">-->
        <!--<Input type="text" v-model="formInline.projectNum" style="width: 250px" placeholder="项目编号">-->
          <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
        <!--</Input>-->
      <!--</FormItem>-->
      <FormItem prop="cityId" label="项目地址">
        <siteSelect v-model="formInline.cityId" style="width: 250px"></siteSelect>
      </FormItem>
      <FormItem prop="projectAddr" label="项目详细地址">
        <Input type="text" v-model="formInline.projectAddr" style="width: 250px" placeholder="项目详细地址">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="buildSize" label="建筑规模(平方米)">
        <Input type="text" v-model="formInline.buildSize" style="width: 250px" placeholder="建筑规模">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="investSize" label="投资规模(万元)">
        <Input type="text" v-model="formInline.investSize" style="width: 250px" placeholder="投资规模">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="projectType" label="项目类型">
        <Input type="text" v-model="formInline.projectType"  style="width: 250px" placeholder="项目类型">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem label="投资主体" prop="investMain">
        <Select v-model="formInline.investMain"  style="width: 250px" placeholder="请选择投资主体">
          <Option value="中央政府">中央政府</Option>
          <Option value="地方政府">地方政府</Option>
          <Option value="企业">企业</Option>
          <Option value="个人">个人</Option>
          <Option value="外国投资">外国投资</Option>
        </Select>
      </FormItem>
      <FormItem prop="mainboardNum" label="门卡主板编号(多个编号请用,号隔开)">
        <Input type="text" v-model="formInline.mainboardNum"  style="width: 250px" placeholder="门卡主板编号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="bankId" label="银行名称">
        <Select v-model="formInline.bankId"  style="width: 250px" placeholder="银行名称">
          <Option :value="item.id + ''" v-for="(item, index) in selectListBank" :key="index">{{ item.accountTitle }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="buildId" label="住建局">
        <Select v-model="formInline.buildId" style="width:250px">
          <Option v-for="item in buildList" :value="item.id + ''" :key="item.id">{{ item.accountName }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="startTimeAndEndTime" label="时间区间">
        <div style="clear:both"></div>
        <div style="width: 100%; display: block;">
          <DatePicker type="month" v-model="formInline.startTime" placement="bottom-end" placeholder="开始时间" style="width: 124px"></DatePicker>
           -
          <DatePicker type="month" v-model="formInline.endTime" placement="bottom-end" placeholder="结束时间" style="width: 124px"></DatePicker>
        </div>
      </FormItem>
      <!--<FormItem style="display: block">-->
        <!--<Button type="primary" :loading="loading" @click="handleSubmit('formInline')">提交</Button>-->
      <!--</FormItem>-->
    </Form>
  </div>
</template>

<script>
import siteSelect from '_c/siteSelect/siteSelect.vue'
import qiniuImg from '_c/qiniu-img/'
import clickImg from '_c/clickImg'
import { add, getAdminsBank } from '@/api/constructionOrganizationAdmin/projectAdmin/projectAdd'
import { getAdminsList } from '@/api/login/checkIn/fillInTheForm'
export default {
  components: {
    siteSelect,
    qiniuImg,
    clickImg
  },
  data () {
    // const validaAccountPhone = (rule, value, callback) => {
    //   if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
    //     callback(new Error('请输入正确的手机号'))
    //   } else {
    //     callback()
    //   }
    // }

    const validaStartTimeAndEndTime = (rule, value, callback) => {
      if (!this.formInline.startTime) {
        callback(new Error('开始时间不能为空'))
      } else if (!this.formInline.endTime) {
        callback(new Error('结束时间不能为空'))
      } else {
        callback()
      }
    }
    return {
      formInline: {
        projectName: '',
        projectNum: '',
        deptAddr: '',
        cityId: [],
        projectAddr: '',
        buildSize: '',
        investSize: '',
        projectType: '',
        investMain: '',
        mainboardNum: '',
        startTime: '',
        endTime: '',
        startTimeAndEndTime: '',
        bankId: '',
        chargeName: '',
        chargePhone: '',
        buildId: ''
      },
      ruleInline: {
        projectName: [
          { required: true, message: '项目名称不能为空', trigger: 'blur' }
        ],
        projectNum: [
          { required: true, message: '项目编号不能为空', trigger: 'blur' }
        ],
        cityId: [
          { required: true, type: 'array', min: 1, message: '地址不能为空', trigger: 'change' }
        ],
        projectAddr: [
          { required: true, message: '单位详细地址不能为空', trigger: 'blur' }
        ],
        buildSize: [
          { required: true, message: '建筑规模不能为空', trigger: 'blur' }
        ],
        investSize: [
          { required: true, message: '投资规模规模不能为空', trigger: 'blur' }
        ],
        projectType: [
          { required: true, message: '投资规模规模不能为空', trigger: 'blur' }
        ],
        investMain: [
          { required: true, message: '投资主体不能为空', trigger: 'change' }
        ],
        mainboardNum: [
          { required: true, message: '门卡主板编号', trigger: 'change' }
        ],
        startTimeAndEndTime: [
          { required: true, validator: validaStartTimeAndEndTime, trigger: 'blur' }
        ],
        bankId: [
          { required: true, message: '请选择银行名称', trigger: 'change' }
        ],
        buildId: [
          { required: true, message: '请选择住建局名称', trigger: 'change' }
        ],
        chargeName: [
          { required: true, message: '请填写负责人姓名', trigger: 'change' }
        ],
        chargePhone: [
          { required: true, message: '请填写负责人电话', trigger: 'change' }
        ]
      },
      loading: false,
      selectListBank: [],
      buildList: []
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
      console.log(this.formInline)
      return this.$refs[name].validate((valid) => {
        if (valid) {
          this.formInline.dLoginName = this.dLoginNameValue
          this.formInline.endTime = new Date(this.formInline.endTime).Format('yyyy-M-d')
          this.formInline.startTime = new Date(this.formInline.startTime).Format('yyyy-M-d')
          console.log(this.formInline)
          add(this.formInline).then(res => {
            this.loading = false
            this.$emit('formState', true)
          }).catch(err => {
            this.loading = false
            this.$Message.error(err)
            this.$emit('formState', false)
          })
        } else {
          this.loading = false
          this.$Message.error('请完善信息')
        }
      })
    },
    // 清空
    emptyForm () {
      this.$refs.formInline.resetFields()
      this.getBankList()
      this.getSelectList()
    },
    // 获取银行账号列表
    getBankList () {
      this.selectListBank = []
      getAdminsBank().then(res => {
        this.selectListBank = []
        res.info.data.forEach(item => {
          this.selectListBank.push({id: item.id, ...item.sysAccountInfoDomain})
        })
      }).catch(err => {
        console.log(err)
      })
    },
    async getSelectList () {
      try {
        let build = await getAdminsList(4).then().catch()
        console.log(build.info.data)
        this.buildList = build.info.data
        console.log(this.buildList)
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted () {
    // 初始化管理员列表
    this.getBankList()
    this.getSelectList()
  }
}
</script>

<style scoped>

</style>
