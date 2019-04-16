<template>
  <div class="bgImg">
    <div class="mgMbl">
      <div style="  display: flex;align-items: center;justify-content: center;text-align: center; width: 100%; height: 100%;">
        <Form ref="formInline" :model="formInline" :rules="ruleInlinePassword" >
          <div style="font-weight: 700; font-size: 32px; margin-bottom: 10px">
            修改密码
          </div>
          <template v-if="!statePassword">
            <FormItem prop="phone">
              <Input type="text" style="width: 300px" v-model="formInline.phone" placeholder="请输入手机号">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="originalPassword">
              <Input type="text" style="width: 300px" v-model="formInline.originalPassword" placeholder="请输入原密码">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </template>
          <template v-if="statePassword">
            <FormItem prop="password">
              <Input type="password" style="width: 300px" v-model="formInline.password" placeholder="请输入密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="passwordConfirm">
              <Input type="password" style="width: 300px" v-model="formInline.passwordConfirm" placeholder="再次请输入密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </template>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">提交</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import './password.less'
export default {
  data () {
    const validaAccountPhone = (rule, value, callback) => {
      if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const comparePassword = (rule, value, callback) => {
      if (value + '' !== this.formInline.password + '') {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      formInline: {
        originalPassword: '',
        passwordConfirm: '',
        password: '',
        phone: ''
      },
      ruleInlinePassword: {
        originalPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: comparePassword, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validaAccountPhone, trigger: 'blur' }
        ]
      },
      disabledValue: false,
      statePassword: false
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('完成')
        } else {
          this.$Message.error('请完善信息')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
