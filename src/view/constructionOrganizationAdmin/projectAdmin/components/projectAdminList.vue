<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">施工许可证: </span>
        <span class="expand-value">{{ row.builderLicenses }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">建设用地规划许可证编号: </span>
        <span class="expand-value">{{ row.buildPlanNum }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">建设工程规划许可证编号: </span>
        <span class="expand-value">{{ row.prjPlanNum }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">项目所在地: </span>
        <span class="expand-value">{{ row.areaCode }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">总投资(万元): </span>
        <span class="expand-value">{{ row.invest }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">总面积(平方米): </span>
        <span class="expand-value">{{ row.buildingArea }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">总长度(米): </span>
        <span class="expand-value">{{ row.buildingLength }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">开工日期: </span>
        <span class="expand-value">{{ row.startDate }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">竣工日期: </span>
        <span class="expand-value">{{ row.completeDate }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">联系人姓名: </span>
        <span class="expand-value">{{ row.linkman }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">联系人办公电话: </span>
        <span class="expand-value">{{ row.linkPhone }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">项目状态: </span>
        <span class="expand-value">{{ row.prjStatus }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">WGS84 经度: </span>
        <span class="expand-value">{{ row.lat }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">	WGS84 纬度: </span>
        <span class="expand-value">{{ row.lng }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">项目地点: </span>
        <span class="expand-value">{{ row.address }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">立项文号: </span>
        <span class="expand-value">{{ row.approvalNum }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">	立项级别: </span>
        <span class="expand-value">{{ row.approvalLevelNum }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">建设规模: </span>
        <span class="expand-value">{{ row.prjSize }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">建设性质: </span>
        <span class="expand-value">{{ row.propertyNum }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">	工程用途: </span>
        <span class="expand-value">{{ row.functionNum }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">国籍或地区: </span>
        <span class="expand-value">{{ row.nationNum }}</span>
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
