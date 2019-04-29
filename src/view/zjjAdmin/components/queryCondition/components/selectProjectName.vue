<template>
  <!-- 姓名 -->
  <div>
    <Input search placeholder="姓名" @on-search="selectProName" style="width: 250px"/>
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
          workerName: e
        })
      }
    },
    mounted () {

    }
  })
</script>
<style>

</style>
