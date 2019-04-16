<template>
  <!-- 添加数据 -->
  <div class="password">
    <Form ref="formIdCard" :model="formIdCard" :rules="ruleCard" v-show="stateFind">
      <FormItem prop="idCardNum" label="身份证号">
        <Input type="text" v-model="formIdCard.idCardNum" style="width: 250px; margin-bottom: 10px" placeholder="身份证号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary"  @click="cardSubmit('formIdCard')">查找</Button>
      </FormItem>
    </Form>
    <div v-if="showData">
      <Row>
        <Col span="8">col-8</Col>
        <Col span="8">col-8</Col>
        <Col span="8">col-8</Col>
      </Row>
      <Row>
        <Col span="8">col-8</Col>
        <Col span="8">col-8</Col>
        <Col span="8">col-8</Col>
      </Row>
    </div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline v-show="stateAdd">
      <FormItem prop="idCardNum" label="身份证号">
        <Input type="text" v-model="formInline.idCardNum" disabled style="width: 250px" placeholder="身份证号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="workerName" label="工人姓名">
        <Input type="text" v-model="formInline.workerName" style="width: 250px" placeholder="工人姓名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="liveAddr" label="详细住址">
        <Input type="textarea" v-model="formInline.liveAddr" style="width: 250px" placeholder="详细住址">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="nativeAddr" label="籍贯">
        <Input type="textarea" v-model="formInline.nativeAddr" style="width: 250px" placeholder="籍贯">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem label="性别" prop="sex">
        <Select v-model="formInline.sex"  style="width: 250px" placeholder="请选择性别">
          <Option value="1">男</Option>
          <Option value="0">女</Option>
        </Select>
      </FormItem>
      <FormItem prop="mobile" label="手机号">
        <Input type="text" v-model="formInline.mobile" style="width: 250px" placeholder="手机号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="idFront" label=" ">
        <!-- 清除浮动 -->
        <div style="display: block; clear:both"></div>
        <qiniu-img style="display: block;" :typeCustom='"default"' @updateImg="updateImgidFront">
          身份证正面
        </qiniu-img>
        <clickImg :rePic='formInline.idFront' @closeClick="formInline.idFront.splice(0, 1)"></clickImg>
      </FormItem>
      <FormItem prop="idBack" label=" ">
        <!-- 清除浮动 -->
        <div style="display: block; clear:both"></div>
        <qiniu-img style="display: block;" :typeCustom='"default"' @updateImg="updateImgidBack">
          身份证反面
        </qiniu-img>
        <clickImg :rePic='formInline.idBack' @closeClick="formInline.idBack.splice(0, 1)"></clickImg>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import siteSelect from '_c/siteSelect/siteSelect.vue'
import qiniuImg from '_c/qiniu-img/'
import clickImg from '_c/clickImg'
import { edit, add, queryWork } from '@/api/constructionOrganizationAdmin/workerAdmin/addWorker'
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
    const idNumber = (rule, value, callback) => {
      if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))) {
        callback(new Error('请输入正确的身份证号'))
      } else {
        callback()
      }
    }
    return {
      formInline: {
        workerName: '',
        workerNum: '',
        idCardNum: '',
        nativeAddr: '',
        sex: '',
        mobile: '',
        liveAddr: '',
        idFront: [],
        idBack: []
      },
      formIdCard: {
        idCardNum: ''
      },
      ruleInline: {
        workerName: [
          { required: true, message: '工人姓名不能为空', trigger: 'blur' }
        ],
        workerNum: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        idCardNum: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' },
          { validator: idNumber, trigger: 'blur' }
        ],
        nativeAddr: [
          { required: true, message: '籍贯不能为空', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validaAccountPhone, trigger: 'blur' }
        ],
        liveAddr: [
          { required: true, message: '住址不能为空', trigger: 'blur' }
        ],
        // idFront: [
        //   { required: true, type: 'array', min: 1, message: '身份证正面不能为空', trigger: 'blur' }
        // ],
        // idBack: [
        //   { required: true, type: 'array', min: 1, message: '身份证反面不能为空', trigger: 'blur' }
        // ]
      },
      ruleCard: {
        idCardNum: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' },
          { validator: idNumber, trigger: 'blur' }
        ]
      },
      loading: false,
      // 添加信息
      stateAdd: false,
      // 显示数据
      showData: false,
      // 查找身份证
      stateFind: true
    }
  },
  props: {
    dLoginNameValue: {
      type: String,
      default: ''
    },
    dataList: {
      default: {}
    }
  },
  methods: {
    handleSubmit (name, state) {
      this.loading = true
      return this.$refs[name].validate((valid) => {
        if (valid) {
          this.formInline.dLoginName = this.dLoginNameValue
          if (state !== 'add') {
            edit(this.formInline).then(res => {
              this.loading = false
              this.$emit('formState', true)
            }).catch(err => {
              this.loading = false
              this.$Message.error(err)
              this.$emit('formState', false)
            })
          } else {
            delete this.formInline.wid
            delete this.formInline.createTime
            delete this.formInline.updateTime
            delete this.formInline.wstate
            add(this.formInline).then(res => {
              this.loading = false
              this.$emit('formState', true)
            }).catch(err => {
              this.loading = false
              this.$Message.error(err)
              this.$emit('formState', false)
            })
          }
        } else {
          this.loading = false
          this.$Message.error('请完善信息')
        }
      })
    },
    // 清空
    emptyForm () {
      this.$refs.formInline.resetFields()
      this.$refs.formIdCard.resetFields()
      this.showData = false
      this.stateFind = true
      this.stateAdd = false
      this.formIdCard.idCardNum = ''
      this.$emit('controlState', true)
    },
    // 图片模块
    updateImgidFront (img) {
      this.formInline.idFront = []
      this.formInline.idFront.push(img)
    },
    updateImgidBack (img) {
      this.formInline.idBack = []
      this.formInline.idBack.push(img)
    },
    examineCardNum () {

    },
    cardSubmit (name, idCardNum) {
      // this.loading = true
      if (idCardNum) {
        this.formIdCard.idCardNum = idCardNum
      }
      return this.$refs[name].validate((valid) => {
        if (valid) {
          queryWork(this.formIdCard.idCardNum).then(res => {
            this.$emit('controlState', false)
            if (res.info !== '0') {
              this.showData = false
              this.stateFind = false
              this.stateAdd = true
              for (let key in this.formInline) {
                for (let keyRes in res.info) {
                  if (key === keyRes) {
                    this.formInline[key] = res.info[keyRes]
                  }
                }
              }
              this.formInline.idBack = [this.formInline.idBack]
              this.formInline.idFront = [this.formInline.idFront]
              this.formInline.sex = this.formInline.sex + ''
              this.formInline.wid = res.info.wid
            } else {
              this.formInline.idCardNum = this.formIdCard.idCardNum
              this.showData = false
              this.stateFind = false
              this.stateAdd = true
            }
          }).catch(err => {
            this.$Message.error(err)
          })
        } else {
          this.$Message.error('请完善信息')
        }
      })
    }
  },
  watch: {
    dataList (e) {
      this.formInline = e
      this.formInline.idBack = [e.idBack]
      this.formInline.idFront = [e.idFront]
      this.formInline.sex = e.sex + ''
      delete this.formInline._rowKey
    }
  }
}
</script>

<style scoped>

</style>
