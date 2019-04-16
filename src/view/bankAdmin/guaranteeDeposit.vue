<template>
  <div>
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    </div>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import { getPageDepts, deptEditState } from '@/api/bankAdmin/guaranteeDeposit'
import clickImg from '_c/clickImg'
export default({
  components: {
    editableTables,
    clickImg
  },
  data () {
    return {
      columns: [
        {
          title: '项目名称',
          key: 'projectName'
        },
        {
          title: '项目地址',
          key: 'projectAddr'
        },
        {
          title: '建筑规模',
          key: 'buildSize'
        },
        // {
        //   title: '营业执照',
        //   key: 'allowPic',
        //   width: 200,
        //   render: (h, params) => {
        //     return h('div', [
        //       h(clickImg, {
        //         props: {
        //           rePic: params.row.allowPic.split(','),
        //           cancelShow: false
        //         }
        //       })
        //     ])
        //   }
        // },
        {
          title: '投资规模',
          key: 'investSize'
        },
        {
          title: '项目类型',
          key: 'projectType'
        },
        {
          title: '投资人',
          key: 'investMain'
        },
        {
          title: '住建局状态',
          key: 'stateZjj',
          render: (h, params) => {
            let text = ''
            if (params.row.pstate + '' === '1') {
              text = '通过'
            } else if (params.row.pstate + '' === '0') {
              text = '未审核'
            } else if (params.row.pstate + '' === '-1') {
              text = '已结束'
            } else {
              text = '未通过'
            }
            return h('div', text)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 250,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: params.row.grantState + '' === '1' || params.row.grantState + '' === '2'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '确定提交吗？',
                      onOk: () => {
                        deptEditState(params.row.pid, '', 1)
                          .then(res => {
                            this.$Message.success('成功')
                            this.getList(this.pageNum)
                          })
                          .catch(err => {
                            this.$Message.error(err.msg)
                          })
                      }
                    })
                  }
                }
              }, '确认工资款'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: params.row.bondState + '' === '1' || params.row.bondState + '' === '2'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '确定提交吗？',
                      onOk: () => {
                        deptEditState(params.row.pid, 1, '')
                          .then(res => {
                            this.$Message.success('成功')
                            this.getList(this.pageNum)
                          })
                          .catch(err => {
                            this.$Message.error(err.msg)
                          })
                      }
                    })
                  }
                }
              }, '确认保证金')
            ])
          }
        }
      ],
      // 基本参数
      dataList: [],
      // 查询参数
      selectValue: '',
      // 分页参数
      pageNum: 1,
      pageTotal: 1
      // 需求参数
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
        this.dataList.push(...res.info.data)
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
      this.accountTitle = ''
      this.accountJob = ''
      this.pageNum = 1
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
