<template>
  <!-- 添加数据 -->
  <div class="password">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="teamName" label="班组名称">
        <Input type="text" v-model="formInline.teamName" style="width: 250px" placeholder="班组名称"></Input>
      </FormItem>
      <FormItem prop="responsiblePersonName" label="责任人姓名">
        <Input type="text" v-model="formInline.responsiblePersonName" style="width: 250px" placeholder="责任人姓名"></Input>
      </FormItem>
      <FormItem prop="responsiblePersonPhone" label="责任人联系电话">
        <Input type="text" v-model="formInline.responsiblePersonPhone" style="width: 250px" placeholder="责任人联系电话"></Input>
      </FormItem>
      <FormItem prop="responsiblePersonIDNumber" label="责任人证件号码">
        <Input type="text" v-model="formInline.responsiblePersonIDNumber" style="width: 250px" placeholder="责任人证件号码"></Input>
      </FormItem>
      <FormItem prop="remark" label="备注">
        <Input type="text" v-model="formInline.remark" style="width: 250px" placeholder="备注"></Input>
      </FormItem>
      <FormItem prop="entryTime" label="进场日期">
        <!--<Input type="text" v-model="formInline.entryTime" style="width: 250px" placeholder="进场日期"></Input>-->
        <DatePicker type="date" placeholder="进场日期" v-model="formInline.entryTime" style="width: 250px"></DatePicker>
      </FormItem>
      <FormItem prop="exitTime" label="退场日期">
        <DatePicker type="date" placeholder="退场日期" v-model="formInline.exitTime" style="width: 250px"></DatePicker>
      </FormItem>
    </Form>
    <!--进场附件-->
    <div v-if="formInline.entryTime !== ''">
      <hr class="border-dashed"/>
      {{dataAccessoryEntryTime}}
      <div>
        <accessory :title="titleEntryTime" v-model="dataAccessoryEntryTime" style="display: inline-block"></accessory>
      </div>
    </div>
    <!--退场附件-->
    <div v-if="formInline.exitTime !== ''">
      <hr class="border-dashed"/>
      <div>
        <accessory :title="titleExitTime" v-model="dataAccessoryExitTime" style="display: inline-block"></accessory>
      </div>
    </div>
  </div>
</template>

<script>
import siteSelect from '_c/siteSelect/siteSelect.vue'
import qiniuImg from '_c/qiniu-img/'
import clickImg from '_c/clickImg'
import { add, getPageListAll, getPageListProfession } from '@/api/constructionOrganizationAdmin/projectAdmin/addProjectWorker'
import accessory from './components/accessory'
export default {
  components: {
    siteSelect,
    qiniuImg,
    clickImg,
    accessory
  },
  data () {
    const validaAccountPhone = (rule, value, callback) => {
      console.log(value)
      if (value !== '') {
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
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
        teamName: '',
        responsiblePersonPhone: '',
        responsiblePersonName: '',
        responsiblePersonIDNumber: '',
        remark: '',
        corpName: '',
        corpCode: '',
        entryAttachments: [],
        exitAttachments: [],
      },
      ruleInline: {
        teamName: [
          { required: true, message: '班组名称不能为空', trigger: 'blur' }
        ],
        responsiblePersonPhone: [
          { validator: validaAccountPhone, trigger: 'blur' }
        ],
        responsiblePersonIDNumber: [
          { validator: identityCard, trigger: 'blur' }
        ],
      },
      loading: false,
      workerListAll: [],
      profession: [],
      dataAccessoryExitTime: [],
      dataAccessoryEntryTime: [],
      titleEntryTime: '进场附件',
      titleExitTime: '退场附件'
    }
  },
  props: {
    dLoginNameValue: {
      type: String,
      default: ''
    },
    projectCode: {
      type: String
    }
  },
  methods: {
    handleSubmit (name) {
      // this.loading = true
      return this.$refs[name].validate((valid) => {
        console.log(this.formInline)
       try {
         // 进场
         if (this.dataAccessoryEntryTime.length !== 0) {
           this.formInline.entryAttachments = []
           this.dataAccessoryEntryTime.forEach(item => {
             if (item.name !== '') {
               this.formInline.entryAttachments.push({
                 name: item.name,
                 data: item.data
               })
             }
           })
         } else {
           delete this.formInline.entryAttachments
         }
         // 退场
         if (this.dataAccessoryExitTime.length !== 0) {
           this.formInline.exitAttachments = []
           this.dataAccessoryExitTime.forEach(item => {
             if (item.name !== '') {
               this.formInline.exitAttachments.push({
                 name: item.name,
                 data: item.data
               })
             }
           })
         } else {
           delete this.formInline.exitAttachments
         }
       } catch (e) {
         console.log(e)
       }
        if (valid) {
          this.formInline.projectCorpId = this.projectCode + ''
          if (this.formInline.entryTime) {
            this.formInline.entryTime = new Date(this.formInline.entryTime).Format("yyyy-MM-dd")
          }
          if (this.formInline.exitTime) {
            this.formInline.exitTime = new Date(this.formInline.exitTime).Format("yyyy-MM-dd")
          }
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
    handleReset () {
        this.$refs.formInline.resetFields()
    },
    updateImgcontract (img) {
      this.formInline.contract.push(img)
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
.border-dashed{
  border: #c5c5c5 0.5px dashed;
  margin: 10px 0
}
</style>
