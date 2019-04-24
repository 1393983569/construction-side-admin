<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">项目经理名称: </span>
        <span class="expand-value">{{ row.pmName }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">项目经理证件类型: </span>
        <span class="expand-value">{{ row.pmIDCardType }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">项目经理证件号码: </span>
        <span class="expand-value">{{ aesDecryptFun(row.pmIDCardNumber) }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">项目经理电话: </span>
        <span class="expand-value">{{ row.pmPhone }}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {aesDecrypt} from '@/libs/util'
  export default {
    name: "projectAdminList",
    props: {
      row: Object
    },
    data () {
      return {
        aesDecryptFun: aesDecrypt
      }
    }
  }
</script>

<style scoped>

</style>
