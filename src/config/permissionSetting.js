export default {
  jurisdiction: [
    {
      "value": 'yonghu_g',
      "expand": true,
      "title": "用户管理",
      'id': "yonghu_g",
      "children": [
        {
          "value": "renyuanxinxi_g",
          "title": "人员信息",
          'id': "yonghu_g",
        },
        {
          "value": "quanxianfenpei_g",
          "title": "权限分配",
          'id': "yonghu_g",
        },
        {
          "value": "工种管理",
          "title": "工种管理",
          'id': "yonghu_g",
        }
      ]
    },
    {
      // 权限名称
      "value": '住建局',
      // 是否展开
      "expand": true,
      // 名称
      "title": "住建局管理",
      // 父标识
      'id': "住建局",
      "children": [
        {
          // 子权限名称
          "value": "施工单位管理住建局",
          // 名称
          "title": "施工单位管理",
          // 父标识
          'id': "住建局",
        },
        {
          "value": "监督预警",
          "title": "监督预警",
          'id': "住建局",
        },
        {
          "value": "建设项目管理",
          "title": "建设项目管理",
          'id': "住建局",
        },
        {
          "value": "住建局用户管理",
          "title": "用户管理",
          'id': "住建局",
        }
      ]
    },
    {
      // 权限名称
      "value": '施工单位管理',
      // 是否展开
      "expand": true,
      // 名称
      "title": "施工单位管理",
      // 父标识
      'id': "施工单位管理",
      "children": [
        {
          // 子权限名称
          "value": "施工项目管理",
          // 名称
          "title": "施工项目管理",
          // 父标识
          'id': "施工单位管理",
        },
        {
          "value": "工人管理",
          "title": "工人管理",
          'id': "施工单位管理",
        },
        {
          "value": "提交工资单",
          "title": "提交工资单",
          'id': "施工单位管理",
        }
      ]
    },
    {
      // 权限名称
      "value": '银行管理',
      // 是否展开
      "expand": true,
      // 名称
      "title": "银行管理",
      // 父标识
      'id': "银行管理",
      "children": [
        {
          // 子权限名称
          "value": "银行管理Node",
          // 名称
          "title": "工资管理",
          // 父标识
          'id': "银行管理",
        },
        // {
        //   "value": "银行用户管理",
        //   "title": "用户管理",
        //   'id': "银行管理",
        // },
        {
          "value": "资金审核",
          "title": "资金审核",
          'id': "银行管理",
        },
        // {
        //   "value": "总工资表",
        //   "title": "总工资表",
        //   'id': "银行管理",
        // }
      ]
    }
  ]
}
