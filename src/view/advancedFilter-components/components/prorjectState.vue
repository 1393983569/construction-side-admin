<template>
  <!--状态 -->
  <div>
    <RadioGroup v-model="status" @on-change="selectStateValue">
      <Radio label="中央政府">中央政府</Radio>
      <Radio label="地方政府">地方政府</Radio>
      <Radio label="企业">企业</Radio>
      <Radio label="个人">个人</Radio>
      <Radio label="外国投资">外国投资</Radio>
    </RadioGroup>
    <Icon type="ios-close" class="icon-delete" @click="selectStateValue('')" />
  </div>
</template>
<script>
export default ({
  data () {
    return {
      status: ''
    }
  },
  methods: {
    selectStateValue (e) {
      this.status = e
      this.$emit('sendValue', {
        investMain: e
      })
    }
  }
})
</script>
<style>

</style>
