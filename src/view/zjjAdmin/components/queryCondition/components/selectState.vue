<template>
  <!--状态 -->
  <div>
    <RadioGroup v-model="gender" @on-change="selectStateValue">
      <Radio label="男">男</Radio>
      <Radio label="女">女</Radio>
    </RadioGroup>
    <Icon type="ios-close" class="icon-delete" @click="selectStateValue('')" />
  </div>
</template>
<script>
  export default ({
    data() {
      return {
        gender: ''
      }
    },
    methods: {
      selectStateValue(e) {
        this.gender = e
        this.$emit('sendValue', {
          gender: e
        })
      }
    },
    mounted () {

    }
  })
</script>
<style>

</style>
