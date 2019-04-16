<template>
  <!-- 添加数据 -->
  <div class="password">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="workerType" label="工种">
        <Select v-model="formInline.workerType" style="width: 250px" placeholder="请选择工种" filterable >
          <Option v-for="(item, index) in profession" :key="index" :value="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="workerSalary" label="工资标准">
        <Input type="text" v-model="formInline.workerSalary" style="width: 250px" placeholder="工资标准">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="workerNum" label="工号">
        <Input type="text" v-model="formInline.workerNum" style="width: 250px" placeholder="工号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="cardNum" label="门禁卡号">
        <Input type="text" v-model="formInline.cardNum" style="width: 250px" placeholder="门禁卡号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import siteSelect from '_c/siteSelect/siteSelect.vue'
import qiniuImg from '_c/qiniu-img/'
import clickImg from '_c/clickImg'
import { edit, getPageListProfession } from '@/api/constructionOrganizationAdmin/projectAdmin/modificationMessage'
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
    return {
      formInline: {
        cardNum: '',
        contract: [],
        workerSalary: '',
        wid: '',
        workerNum: '',
        workerType: ''
      },
      ruleInline: {
        cardNum: [
          { required: true, message: '卡号不能为空', trigger: 'blur' }
        ],
        workerSalary: [
          { required: true, message: '工资标准不能为空', trigger: 'blur' }
        ],
        workerNum: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        workerType: [
          { required: true, message: '工种不能为空', trigger: 'change' }
        ]
      },
      loading: false,
      workerListAll: [],
      profession: []
    }
  },
  props: {
    dLoginNameValue: {
      type: String,
      default: ''
    },
    pid: {
      default: ''
    },
    did: {
      default: ''
    },
    modificationData: {
      default: ''
    }
  },
  methods: {
    handleSubmit (name) {
      console.log(this.formInline)
      this.loading = true
      return this.$refs[name].validate((valid) => {
        if (valid) {
          // this.formInline.dLoginName = this.dLoginNameValue
          // this.formInline.pid = this.pid
          // this.formInline.did = this.did
          this.$Message.success('完成')
          edit(this.formInline).then(res => {
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
    },
    updateImgcontract (img) {
      this.formInline.contract.push(img)
    }
  },
  mounted () {
    getPageListProfession().then(res => {
      this.profession = []
      res.info.forEach(item => {
        this.profession.push({
          value: item.tid + '',
          label: item.profession
        })
      })
      // this.profession
    }).catch(err => {
      console.log(err)
    })
  },
  watch: {
    modificationData (e) {
      e.workerType = e.workerType + ''
      this.formInline = e
    }
  }
}
</script>

<style scoped>

</style>
