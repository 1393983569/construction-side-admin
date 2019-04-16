<template>
  <!-- 添加数据 -->
  <div class="password">
    <div style="width: 300px; font-weight: 700; font-size: 42px">
      {{ textValue }}
    </div>
  </div>
</template>

<script>
import './checkIn.less'
export default {
  data () {
    return {

    }
  },
  props: {
    textValue: {
      type: String,
      default: '审核中'
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
