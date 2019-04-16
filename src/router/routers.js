import Main from '_c/main-new'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 *  自定义图标前必须加 '_' 可省去 'icon-'
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import ('@/view/login/login.vue')
  },
  {
    path: '/passwordForget',
    name: 'passwordForget',
    meta: {
      title: '忘记密码',
      hideInMenu: true
    },
    component: () => import ('@/view/login/passwordForget/passwordForget.vue')
  },
  {
    path: '/checkIn',
    name: 'checkIn',
    meta: {
      title: '工地入住',
      hideInMenu: true
    },
    component: () => import ('@/view/login/checkIn/checkIn.vue')
  },
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/userManagement',
    name: 'userManagement',
    meta: {
      access: ['yonghu_g'],
      icon: '_gongren',
      title: '用户管理'
    },
    component: Main,
    children: [
      {
        path: 'message',
        name: 'message',
        meta: {
          access: ['renyuanxinxi_g'],
          icon: '_gongren',
          title: '人员信息'
        },
        component: () => import('@/view/userManagement/message.vue')
      },
      {
        path: 'adminJurisdiction',
        name: 'adminJurisdiction',
        meta: {
          access: ['quanxianfenpei_g'],
          icon: '_gongren',
          title: '权限分配'
        },
        component: () => import('@/view/userManagement/jurisdiction/adminJurisdiction.vue')
      },
      {
        path: 'addProfession',
        name: 'addProfession',
        meta: {
          // access: ['工种管理'],
          icon: '_leibieguanli',
          title: '工种管理'
        },
        component: () => import('@/view/userManagement/addProfession.vue')
      },
      {
        path: 'experience',
        name: 'experience',
        meta: {
          access: ['经验类型'],
          icon: '_leibieguanli',
          title: '经验类型'
        },
        component: () => import('@/view/userManagement/experience.vue')
      }
    ]
  },
  {
    path: '/zjjAdmin',
    name: 'zjjAdmin',
    meta: {
      access: ['住建局'],
      icon: '_jianzhu',
      title: '住建局管理'
    },
    component: Main,
    children: [
      {
        path: 'constructionOrganization',
        name: 'constructionOrganization',
        meta: {
          access: ['施工单位管理住建局'],
          icon: '_shigongdanwei',
          title: '施工单位管理'
        },
        component: () => import('@/view/zjjAdmin/companyAdmin.vue')
      },
      {
        path: 'supervision',
        name: 'supervision',
        meta: {
          access: ['监督预警'],
          icon: '_jiandukaohe',
          title: '监督预警'
        },
        component: () => import('@/view/zjjAdmin/supervision.vue')
      },
      {
        path: 'construction',
        name: 'construction',
        meta: {
          access: ['建设项目管理'],
          icon: '_jiandukaohe',
          title: '建设项目管理'
        },
        component: () => import('@/view/zjjAdmin/construction.vue')
      },
      {
        path: 'userAdmin',
        name: 'userAdmin',
        meta: {
          access: ['住建局用户管理'],
          icon: '_leibieguanli',
          title: '用户管理'
        },
        component: () => import('@/view/zjjAdmin/userAdmin.vue')
      },
      {
        path: 'salaryFrom',
        name: 'salaryFrom',
        meta: {
          access: ['工资表'],
          icon: '_leibieguanli',
          title: '工资表'
        },
        component: () => import('@/view/zjjAdmin/salaryFrom.vue')
      },
      {
        path: 'salaryDetails',
        name: 'salaryDetails',
        meta: {
          // access: ['工资详情'],
          icon: '_leibieguanli',
          title: '工资详情'
        },
        component: () => import('@/view/zjjAdmin/salaryDetails.vue')
      }
    ]
  },
  {
    path: '/constructionOrganizationAdmin',
    name: 'constructionOrganizationAdmin',
    meta: {
      access: ['施工单位管理'],
      icon: '_shigongdanwei',
      title: '施工单位管理'
    },
    component: Main,
    children: [
      {
        path: 'projectAdmin',
        name: 'projectAdmin',
        meta: {
          access: ['施工项目管理'],
          icon: '_xiangmu',
          title: '施工项目管理'
        },
        component: () => import('@/view/constructionOrganizationAdmin/projectAdmin/projectAdmin.vue')
      },
      {
        path: 'workerAdmin',
        name: 'workerAdmin',
        meta: {
          access: ['工人管理'],
          icon: '_gongren',
          title: '工人管理'
        },
        component: () => import('@/view/constructionOrganizationAdmin/workerAdmin/workerAdmin.vue')
      },
      {
        path: 'paySheet',
        name: 'paySheet',
        meta: {
          access: ['提交工资单'],
          icon: '_gongzibiaoshenhe',
          title: '提交工资单'
        },
        component: () => import('@/view/constructionOrganizationAdmin/paySheet/paySheet.vue')
      },
      // {
      //   path: 'wageQuery',
      //   name: 'wageQuery',
      //   meta: {
      //     access: ['工资单'],
      //     icon: '_gongzibiaoshenhe',
      //     title: '工资单'
      //   },
      //   component: () => import('@/view/constructionOrganizationAdmin/wageQuery/wageQuery.vue')
      // }
    ]
  },
  {
    path: '/bankAdminFather',
    name: 'bankAdminFather',
    meta: {
      access: ['银行管理'],
      icon: '_yinhang',
      title: '银行管理'
    },
    component: Main,
    children: [
      {
        path: 'bankAdmin',
        name: 'bankAdmin',
        meta: {
          access: ['银行管理Node'],
          icon: '_yinhang',
          title: '工资管理'
        },
        component: () => import('@/view/bankAdmin/bankAdmin.vue')
      },
      {
        path: 'bankUser',
        name: 'bankUser',
        meta: {
          access: ['银行用户管理'],
          icon: '_yinhang',
          title: '支行管理'
        },
        component: () => import('@/view/bankAdmin/userAdmin.vue')
      },
      {
        path: 'cashDeposit',
        name: 'cashDeposit',
        meta: {
          access: ['押金审核'],
          icon: '_yinhang',
          title: '资金审核'
        },
        component: () => import('@/view/bankAdmin/guaranteeDeposit.vue')
      },
      {
        path: 'salaryFromBa',
        name: 'salaryFromBa',
        meta: {
          access: ['总工资表'],
          icon: '_yinhang',
          title: '总工资表'
        },
        component: () => import('@/view/bankAdmin/salaryFrom.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
