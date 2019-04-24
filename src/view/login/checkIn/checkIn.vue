<template>
  <div style="width: 100%; height: 100%;" class="bgImg">
    <div class="mgMbl" style="width: 900px;">
      <span style="color: #348EED; cursor: pointer" @click="returnPage">
        <<返回首页
      </span>
      <fillInThePhone v-if="this.stateFill" @getStatePhone="getStatePhone"></fillInThePhone>
      <fillInTheForm @formSuccess="formSuccess" :dLoginNameValue="dLoginName" ref="fillInTheFormSub" v-if="this.stateFillSub"></fillInTheForm>
      <!--<fillInTheForm @formSuccess="formSuccess" :dLoginNameValue="dLoginName" ref="fillInTheFormSub" v-if="true"></fillInTheForm>-->
      <showState :textValue='textValue' v-if="stateShow"></showState>
    </div>
  </div>
</template>
<script>
import fillInThePhone from './fillInThePhone'
import fillInTheForm from './fillInTheForm'
import showState from './showState'
export default {
  name: 'passwordForget',
  components: {
    fillInThePhone,
    fillInTheForm,
    showState
  },
  data () {
    return {
      stateFill: true,
      stateShow: false,
      stateFillSub: false,
      dLoginName: 0,
      textValue: ''
    }
  },
  methods: {
    getStatePhone (e) {
      const state = e.split(':')[0]
      this.dLoginName = e.split(':')[1]
      switch (state) {
        case '不存在':
          this.stateFill = false
          this.stateFillSub = true
          this.stateShow = false
          this.$refs.fillInTheFormSub.getSelectList()
          console.log(this.$refs.fillInTheFormSub)
          break
        case '审核中':
          this.showStateForm('审核中')
          break
        case '通过':
          this.showStateForm('通过')
          break
        case '未通过':
          this.showStateForm('未通过')
          break
        default:
      }
    },
    // 展示审核状态
    showStateForm (text) {
      this.textValue = text
      this.stateFill = false
      this.stateFillSub = false
      this.stateShow = true
    },
    formSuccess (e) {
      if (e) this.showStateForm('审核中')
    },
    returnPage () {
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style scoped>

</style>
