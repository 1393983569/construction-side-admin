<template>
  <!-- 添加数据 -->
  <div class="password">
    <Form ref="formInline" style="width: 300px" :model="formInline" :rules="ruleInline" >
      <FormItem prop="deptName" label="单位名称">
        <Input type="text" v-model="formInline.deptName" placeholder="单位名称">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="cityId" label="单位地址">
        <siteSelect v-model="formInline.cityId" style="width: 300px"></siteSelect>
      </FormItem>
      <FormItem prop="deptAddr" label="单位详细地址">
        <Input type="text" v-model="formInline.deptAddr" placeholder="单位详细地址">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="deptPhone" label="单位电话">
        <Input type="text" v-model="formInline.deptPhone" placeholder="单位电话">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <!--<FormItem prop="deptNum" label="项目名称">-->
        <!--<Input type="text" v-model="formInline.deptNum" placeholder="项目名称">-->
          <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
        <!--</Input>-->
      <!--</FormItem>-->
      <!--<FormItem prop="deptNum" label="银行">-->
        <!--<Select v-model="formInline.bankId" style="width:300px">-->
          <!--<Option v-for="item in bankList" :value="item.id" :key="item.id">{{ item.accountTitle }}</Option>-->
        <!--</Select>-->
      <!--</FormItem>-->
      <!--<FormItem prop="buildId" label="住建局">-->
        <!--<Select v-model="formInline.buildId" style="width:300px">-->
          <!--<Option v-for="item in buildList" :value="item.id" :key="item.id">{{ item.accountTitle }}</Option>-->
        <!--</Select>-->
      <!--</FormItem>-->
      <FormItem prop="allowPic" label="营业执照">
        <!-- 清除浮动 -->
        <div style="display: block; clear:both"></div>
        <qiniu-img style="display: block;" :typeCustom='"default"' @updateImg="updateImg">
          上传图片
        </qiniu-img>
        <clickImg :rePic='formInline.allowPic' @closeClick="closeClick"></clickImg>
      </FormItem>
      <FormItem>
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
import { add, getAdminsList } from '@/api/login/checkIn/fillInTheForm'
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
        deptName: '',
        deptPhone: '',
        deptNum: '',
        deptAddr: '',
        cityId: [],
        allowPic: [],
        bankId: '',
        buildId: ''
      },
      ruleInline: {
        deptName: [
          { required: true, message: '单位名称不能为空', trigger: 'blur' }
        ],
        deptPhone: [
          { required: true, message: '单位电话不能为空', trigger: 'blur' }
        ],
        deptNum: [
          { required: true, message: '单位编号不能为空', trigger: 'blur' }
        ],
        // allowPic: [
        //   { required: true, type: 'array', min: 1, message: '营业执照不能为空', trigger: 'blur' }
        // ],
        cityId: [
          { required: true, type: 'array', min: 1, message: '地址不能为空', trigger: 'blur' }
        ],
        deptAddr: [
          { required: true, message: '单位详细地址不能为空', trigger: 'blur' }
        ]
      },
      loading: false,
      bankList: [],
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
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('完成')
          this.formInline.dLoginName = this.dLoginNameValue
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
    }
  }
}
</script>

<style scoped>

</style>
