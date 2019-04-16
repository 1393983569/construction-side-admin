<template>
  <!-- 项目名称 -->
  <div>
    <Input search placeholder="请输入项目编号" @on-search="selectProName"/>
  </div>
</template>
<script>
export default ({
  data () {
    return {

    }
  },
  methods: {
    selectProName (e) {
      this.$emit('sendValue', {
        projectNum: e
      })
    }
  }
})
</script>
<style>

</style>
