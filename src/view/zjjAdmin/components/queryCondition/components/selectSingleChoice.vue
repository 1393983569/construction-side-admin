<template>
  <!-- 所在企业 -->
  <div>
    <Input search placeholder="所在企业" @on-search="selectProName" style="width: 250px"/>
  </div>
</template>
<script>
  export default ({
    data() {
      return {

      }
    },
    methods: {
      selectProName(e) {
        this.$emit('sendValue', {
          projectCropName: e
        })
      }
    },
    mounted () {

    }
  })
</script>
<style>

</style>
