<template>
  <div>
    <Button type="primary" @click="readCard" :loading="loading_bu">读取身份证</Button>
  </div>
</template>

<script>
  import {addReadMsg}from '@/api/data'
  export default {
    data() {
      return {
        info:{},
        cardImg: false,
        loading_bu: false
      }
    },
    methods: {
      readCard() {
        this.cardImg = true
        this.loading_bu = true
        addReadMsg().then(res => {
          this.loading_bu = false
          if(res.retcode !=='0x41'){
            let {police, photobase64, nation, name, cardno, address, born, userlifeb, userlifee, sex} = res
            let bornValue = born + ''
            let bornDate = `${bornValue.substring(0, 4)}-${bornValue.substring(4, 6)}-${bornValue.substring(6, 8)}`
            // let imgValue = 'data:image/jpg;base64,' + photobase64
            let imgValue = photobase64
            let userlifebValue = `${userlifeb.substring(0, 4)}-${userlifeb.substring(4, 6)}-${userlifeb.substring(6, 8)}`
            let userlifeeValue = `${userlifee.substring(0, 4)}-${userlifee.substring(4, 6)}-${userlifee.substring(6, 8)}`
            let date = {
              bornDate,
              police,
              imgValue,
              nation,
              name,
              cardno,
              address,
              userlifebValue,
              userlifeeValue,
              sex
            }
            this.info = res
            this.$emit('getData', date)
          }else{
            this.$Message.error(res.retmsg)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
