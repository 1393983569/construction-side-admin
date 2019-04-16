<template>
  <!-- 添加数据 -->
  <div class="password">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem label="请选择工人" prop="wid">
        <Select v-model="formInline.wid" style="width: 250px" placeholder="请选择工人" filterable >
          <Option v-for="(item, index) in workerListAll" :key="index" :value="item.wid + ''">{{ `姓名:${item.workerName} 电话:${item.mobile}` }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="workerType" label="工种">
        <Select v-model="formInline.workerType" style="width: 250px" placeholder="请选择工种" filterable >
          <Option v-for="(item, index) in profession" :key="index" :value="item.value + ''">{{ item.label }}</Option>
        </Select>
        <!--this.profession-->
      </FormItem>
      <FormItem prop="workerSalary" label="工资标准(元/天)">
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
      <FormItem prop="contract" label="合同">
        <!-- 清除浮动 -->
        <div style="display: block; clear:both"></div>
        <qiniu-img style="display: block;" :typeCustom='"default"' @updateImg="updateImgcontract">
          合同(照片)
        </qiniu-img>
        <clickImg :rePic='formInline.contract' @closeClick="formInline.contract.splice(0, 1)"></clickImg>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import siteSelect from '_c/siteSelect/siteSelect.vue'
import qiniuImg from '_c/qiniu-img/'
import clickImg from '_c/clickImg'
import { add, getPageListAll, getPageListProfession } from '@/api/constructionOrganizationAdmin/projectAdmin/addProjectWorker'
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
        // contract: [
        //   { required: true, type: 'array', min: 1, message: '合同照片不能为空', trigger: 'change' }
        // ],
        workerSalary: [
          { required: true, message: '工资标准不能为空', trigger: 'blur' }
        ],
        wid: [
          { required: true, message: '工人不能为空', trigger: 'change' }
        ],
        workerNum: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        workerType: [
          { required: true, message: '工种不能为空', trigger: 'blur' }
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
    }
  },
  methods: {
    handleSubmit (name) {
      this.loading = true
      return this.$refs[name].validate((valid) => {
        if (valid) {
          // this.formInline.dLoginName = this.dLoginNameValue
          this.formInline.pid = this.pid
          this.formInline.did = this.did
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
      this.workerListAll = []
      getPageListAll().then(res => {
        this.workerListAll = []
        res.info.forEach(item => {
          this.workerListAll.push(item)
        })
      }).catch(err => {
        console.log(err)
      })
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
          value: item.tid,
          label: item.profession
        })
      })
      // this.profession
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
