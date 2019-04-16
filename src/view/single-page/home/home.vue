<template>
  <div>
    <div style="height: 50px">
    </div>
      首页
      <!-- <cartogram></cartogram> -->
    <div style="margin-top: 100px">
      <information></information>
    </div>
  </div>
</template>
<script>
// import cartogram from './cartogram/cartogram.vue'
import information from './information/information.vue'
import Cookies from 'js-cookie'
export default({
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {

  },
  components: {
    // cartogram,
    information

  },
  mounted () {
    this.$router.push({
      name: Cookies.get('token_zhihuiminggong')
    })
  }
})
</script>
<style>

</style>
