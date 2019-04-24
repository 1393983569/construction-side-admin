<template>
  <div class="password">
    <Form ref="formInline" style="width: 300px" :model="formInline" :rules="ruleInline" >
      <div style="font-weight: 700; font-size: 32px; margin-bottom: 10px">
        入住
      </div>
      <FormItem prop="mobilePhone" label="手机号（此手机号为登录系统账号）">
        <Input type="text" v-model="formInline.mobilePhone" placeholder="请输入手机号">
          <Icon type="md-calculator" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" :loading="loading" @click="handleSubmit('formInline')">下一步</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import './checkIn.less'
import { getAccountDetail } from '@/api/login/checkIn/fillInThePhone'
export default {
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
        mobilePhone: ''
      },
      ruleInline: {
        mobilePhone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    handleSubmit (name) {
      this.loading = true
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('getStatePhone', '不存在:' + this.formInline.mobilePhone)
          this.loading = false
          // getAccountDetail(this.formInline.mobilePhone).then(res => {
          //   switch (res.info) {
          //     case '该用户不存在,请去申请':
          //       // 用户不存在
          //       this.$emit('getStatePhone', '不存在:' + this.formInline.mobilePhone)
          //       this.loading = false
          //       break
          //     case '通过':
          //       // 请求正确的事
          //       this.$emit('getStatePhone', '通过:' + this.formInline.mobilePhone)
          //       this.loading = false
          //       break
          //     case '未通过':
          //       // 请求正确的事
          //       this.$emit('getStatePhone', '未通过:' + this.formInline.mobilePhone)
          //       this.loading = false
          //       break
          //     case '审核中':
          //       // 请求正确的事
          //       this.$emit('getStatePhone', '审核中:' + this.formInline.mobilePhone)
          //       this.loading = false
          //       break
          //     default:
          //   }
          // }).catch(err => {
          //   this.loading = false
          //   this.$Message.error(err)
          // })
        } else {
          this.loading = false
          this.$Message.error('错误')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
