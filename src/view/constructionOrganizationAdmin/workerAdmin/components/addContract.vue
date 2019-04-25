<template>
  <!-- 添加数据 -->
  <div>
    <Form ref="formValidate" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="startDate" label="生效日期">
        <DatePicker type="date" placeholder="生效日期" v-model="formInline.startDate" style="width: 250px"></DatePicker>
      </FormItem>
      <FormItem prop="endDate" label="失效日期">
        <DatePicker type="date" placeholder="失效日期" v-model="formInline.endDate" style="width: 250px"></DatePicker>
      </FormItem>
      <FormItem prop="contractPeriodType" label="合同期限类型">
        <Select v-model="formInline.contractPeriodType" style="width:250px" placeholder="合同期限类型">
          <Option  value="0">固定期限合同</Option>
          <Option  value="1">以完成一定工作为期限的合同</Option>
        </Select>
      </FormItem>
      <div style="margin-bottom: 5px; color: #adacac">附件1</div>
      <div style="border: 1px dashed #dadada; padding: 8px; margin-bottom: 10px">
        <FormItem prop="attachmentsOnename" label="附件名称">
          <Input type="text" v-model="formInline.attachmentsOnename"  style="width: 250px" placeholder="附件名称" />
        </FormItem>
        <FormItem prop="attachmentsOnedata" label="合同照片" style="display: block">
          <div style=" clear:both"></div>
          <uploadMultiple v-model="formInline.attachmentsOnedata"/>
        </FormItem>
      </div>
      <div style="cursor: pointer" v-if="!moreAccessory" @click="addMoreAccessory">
        <Icon type="md-add-circle" style="font-size: 16px; vertical-align: top"/>
        <span style="color: #2D8cF0; vertical-align: top">更多附件</span>
      </div>
      <section v-if="moreAccessory">
        <div style="margin-bottom: 5px; color: #adacac">附件2</div>
        <div style="border: 1px dashed #dadada; padding: 8px">
          <FormItem prop="attachmentsTowname" label="附件名称">
            <Input type="text" v-model="formInline.attachmentsTowname"  style="width: 250px" placeholder="附件名称" />
          </FormItem>
          <FormItem prop="attachmentsTowdata" label="合同照片" style="display: block">
            <div style=" clear:both"></div>
            <uploadMultiple v-model="formInline.attachmentsTowdata"/>
          </FormItem>
        </div>
      </section>
      <div style="cursor: pointer; margin-top: 10px" v-if="moreAccessory" @click="delMoreAccessory">
        <Icon type="md-close-circle"  style="font-size: 16px; vertical-align: top"/>
        <span style="color: #ec241f; vertical-align: top">删除附件</span>
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
          startDate: '',
          endDate: '',
          attachmentsOnename: '',
          attachmentsOnedata: '',
          attachmentsTowname: '',
          attachmentsTowdata: '',
          contractPeriodType: ''
        },
        ruleInline: {
          startDate: [
            { required: true, type: 'date', message: '生效日期不能为空', trigger: 'change' }
          ],
          endDate: [
            { required: true, type: 'date', message: '生效日期不能为空', trigger: 'change' }
          ],
          attachmentsOnename: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          attachmentsOnedata: [
            { required: true, message: '合同照片不能为空', trigger: 'change' }
          ],
          contractPeriodType: [
            { required: true, message: '合同期限类型不能为空', trigger: 'change' }
          ]
        },
        loading: false,
        selectListBank: [],
        cultureLevelTypeList: [],
        workerTypeList: [],
        workRoleList: [],
        politicsTypeList: [],
        moreAccessory: false
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
              if (this.formInline.attachmentsOnename && this.formInline.attachmentsOnedata) {
                data.attachments.push({
                  name: this.formInline.attachmentsOnename,
                  data: this.addImgBase(this.formInline.attachmentsOnedata)
                })
              }
              if (this.formInline.attachmentsTowname && this.formInline.attachmentsTowdata) {
                data.attachments.push({
                  name: this.formInline.attachmentsTowname,
                  data: this.addImgBase(this.formInline.attachmentsTowdata)
                })
              }
              data.contractPeriodType = this.formInline.contractPeriodType
              data.startDate = new Date(data.startDate).Format("yyyy-MM-dd")
              data.endDate = new Date(data.endDate).Format("yyyy-MM-dd")
              data.wId = this.projectCorpId
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
      }
    },
    mounted () {
      //
    }
  }
</script>

<style scoped>

</style>
