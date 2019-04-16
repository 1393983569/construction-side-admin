<template>
  <div>
    <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'>
      <Input search @on-search="clickSearch" placeholder="请输入单位名称" />
    </editableTables>
    <Modal
        v-model="modalProject"
        width='700'
        title="项目审核">
        <Table :columns="columnsProject" :data="dataProject"></Table>
    </Modal>
    <Modal
        v-model="modalReason"
        title="理由"
        @on-ok="okReason"
        @on-cancel="cancelReason">
        <div>
          请输入理由
        </div>
        <Input v-model="reason" placeholder="请输入理由" style="width: 300px" />
    </Modal>
    <Modal
      v-model="modalReasonSee"
      title="理由">
      <div>
        {{remark}}
      </div>
    </Modal>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import { getPageDepts, editState, getProjectList, overProjectApi, projectQuery } from '@/api/zjjAdmin/companyAdmin'
import clickImg from '_c/clickImg'
import './companyAdmin'
export default({
  components: {
    editableTables,
    clickImg
  },
  data () {
    return {
      columns: [
        {
          title: '单位名称',
          key: 'deptName'
        },
        {
          title: '单位电话',
          key: 'deptPhone'
        },
        // {
        //   title: '单位编号',
        //   key: 'deptNum'
        // },
        {
          title: '营业执照',
          key: 'allowPic',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h(clickImg, {
                props: {
                  rePic: params.row.allowPic.split(','),
                  cancelShow: false
                }
              })
            ])
          }
        },
        {
          title: '单位地址',
          key: 'deptAddr'
        },
        // {
        //   title: '审核状态',
        //   key: 'dstate',
        //   render: (h, params) => {
        //     let htmlText = ''
        //     switch (this.dataList[params.index].dstate) {
        //       case 0:
        //         htmlText = '<span style="color: #3272d9">未审核</span>'
        //         break
        //       case 1:
        //         htmlText = '<span style="color: #24b656">通过</span>'
        //         break
        //       case 2:
        //         htmlText = '<span style="color: #d96631">不通过</span>'
        //         break
        //     }
        //     return (
        //       <div domPropsInnerHTML={htmlText}></div>
        //     )
        //   }
        // },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return (
              <i-button size="small" type="primary" on-click={this.overProject.bind(this, params.row)}>项目管理</i-button>
            )
          }
        }
      ],
      // 基本参数
      dataList: [],
      // 查询参数
      selectValue: {},
      // 分页参数
      pageNum: 1,
      pageTotal: 1,
      // 需求参数
      modalProject: false,
      dataProject: [],
      reason: '',
      modalReason: false,
      did: '',
      state: '',
      pid: '',
      remark: '',
      columnsProject: [
        {
          title: '项目名称',
          key: 'projectName'
        },
        {
          title: '项目负责人姓名',
          key: 'chargeName'
        },
        {
          title: '项目负责人电话',
          key: 'mainboardNum'
        },
        {
          title: '地区',
          key: 'projectAddr'
        },
        {
          title: '项目类型',
          key: 'projectType'
        },
        {
          title: '投资主体',
          key: 'investMain'
        },
        {
          title: '投资主体',
          key: 'investMain'
        },
        {
          title: '保证金状态',
          key: 'bondState',
          render: (h, params) => {
            return (
              <div>
                {params.row.bondState === 2 ? '未通过' : params.row.bondState === 0 ? '未审核' : '通过'}
              </div>
            )
          }
        },
        {
          title: '发放金状态',
          key: 'grantState',
          render: (h, params) => {
            return (
              <div>
              {params.row.grantState === 2 ? '未通过' : params.row.grantState === 0 ? '未审核' : '通过'}
              </div>
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            let state = params.row.pstate
            // let state = 0
            if (state === 0) {
              return (
                <div class="custom">
                <dropdown on-on-click={this.clickDropdown}>
                <i-button type="primary">
                审核
                <icon type="ios-arrow-down"></icon>
                </i-button>
                <dropdownMenu slot="list" >
                <dropdownItem name={`1:${params.row.pid}:${params.index}:${params.row.did}`}>
                <div>
                通过
                </div>
                </dropdownItem>
                <dropdownItem name={`2:${params.row.pid}:${params.index}:${params.row.did}`}>
                <div>
                不通过
                </div>
                </dropdownItem>
                </dropdownMenu>
                </dropdown>
                </div>
            )
            } else if (state === 1) {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    disabled: this.dataProject[params.index].pstate + '' === '-1'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '提示',
                        content: '确定结束吗？',
                        onOk: () => {
                          overProjectApi(params.row.pid)
                            .then(res => {
                              this.getProjectListFun(params.row.did)
                            })
                            .catch(err => {
                              this.$Message.error(err.msg)
                            })
                        }
                      })
                    }
                  }
                }, '结束项目')
              ])
            } else if (state === 2) {
              return(
                <div>
                  <i-button type="primary" size="small" on-click={this.showReason.bind(this, params.row.pid)}>不通过理由</i-button>
                </div>
              )
            } else if (-1) {
              return(
                <div>不可操作</div>
              )
            } else {
              return(
                <div>不可操作</div>
              )
            }
          }
        }
      ],
      modalReasonSee: false
    }
  },
  methods: {
    // 分页查询管理员
    getList () {
      this.dataList = []
      getPageDepts(this.pageNum, this.selectValue).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map(({createTime, deptAddr, deptName, deptNum, deptPhone, allowPic, did, dstate}) => {
          this.dataList.push({
            createTime,
            deptAddr,
            deptName,
            deptNum,
            deptPhone,
            allowPic,
            did,
            dstate
          })
        })
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    // 得到页数
    getPageNum (e) {
      this.pageNum = e
      this.getList()
    },
    // 复位
    restoration () {
      this.pageNum = 1
    },
    getProjectListFun (e) {
      this.dataProject = []
      getProjectList(e).then(res => {
           this.dataProject = []
           if (res.info === '暂无数据') {
           this.$Message.error(res.info)
           this.pageTotal = 1
           return
        }
        this.dataProject.push(...res.info)
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击下拉菜单
    clickDropdown (e) {
      console.log(e)
      // 判断是否为 未审核
      // if (this.dataList[e.split(':')[2]].dstate !== 0) return
      const sate = e.split(':')[0] === '1'
      this.pid = e.split(':')[1]
      this.did = e.split(':')[3]
      const title = sate ? '通过' : '不通过'
      const content = `<p style="color: #3272d9;">请确定操作</p>`
      if (title === '通过') {
        this.$Modal.confirm({
          title: title,
          content: content,
          onOk: () => {
            editState(this.pid, e.split(':')[0]).then(res => {
              this.getList()
              this.getProjectListFun(this.did)
            }).catch(err => {
              console.log(err)
            })
          }
        })
      } else {
        this.modalReason = true
        this.state = e.split(':')[0]
      }
    },
    addReason () {
      editState(this.pid, this.state, this.reason).then(res => {
        this.pid = ''
        this.state = ''
        this.reason = ''
        this.$Message.success('成功')
        this.getProjectListFun(this.did)
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    clickSearch (e) {
      this.selectValue.deptName = e
      this.restoration()
      this.getList()
    },
    overProject (e) {
      this.remark = ''
      this.modalProject = true
      this.getProjectListFun(e.did)
    },
    okReason () {
      this.addReason()
    },
    cancelReason () {
      this.reason = ''
    },
    showReason (e) {
      console.log(e)
      this.modalReasonSee = true
      projectQuery(e).then(res => {
        console.log(res)
        this.remark = res.info.remark
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    // 初始化管理员列表
    this.getList()
  }
})
</script>
<style>
</style>
