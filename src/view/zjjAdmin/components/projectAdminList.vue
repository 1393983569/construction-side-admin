<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">注册日期: </span>
        <span class="expand-value">{{ new Date(row.registerDate).Format("yyyy-MM-dd") }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">成立日期: </span>
        <span class="expand-value">{{ new Date(row.establishDate).Format("yyyy-MM-dd") }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">办公电话: </span>
        <span class="expand-value">{{ row.officePhone }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">传真号码: </span>
        <span class="expand-value">{{ row.faxNumber }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">联系人姓名: </span>
        <span class="expand-value">{{ row.linkman }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">联系人办公电话: </span>
        <span class="expand-value">{{ row.linkTel }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">企业联系邮箱: </span>
        <span class="expand-value">{{ row.email }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">单位性质: </span>
        <span class="expand-value">{{ row.corpTypeDomain.name }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">企业联系邮箱: </span>
        <span class="expand-value">{{ row.email }}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "projectAdminList",
    props: {
      row: Object
    }
  }
</script>

<style scoped>

</style>
