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
import { projectGetPageList, projectAdd } from '@/api/bankAdmin/guaranteeDeposit'
import clickImg from '_c/clickImg'
import projectAdminList from './components/projectAdminList'
export default({
  components: {
    editableTables,
    clickImg,
    projectAdminList
  },
  data () {
    return {
      columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(projectAdminList, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '项目名',
          key: 'name'
        },
        {
          title: '项目编码',
          key: 'projectCode'
        },
        {
          title: '项目分类',
          key: 'category'
        },
        {
          title: '项目简介',
          key: 'description'
        },
        {
          title: '总承包单位统一社会信用代码',
          key: 'contractorCorpCode'
        },
        {
          title: '总承包单位名称',
          key: 'contractorCorpName'
        },
        {
          title: '建设单位名称',
          key: 'buildCorpCode'
        },
        {
          title: '建设单位统一社会信用代码',
          key: 'buildCorpCode'
        },
        {
          title: '发放金状态',
          key: 'grantState',
          render: (h, params) => {
            return h('div', params.row.grantState + '' === '0' ? '未审核' : '通过')
          }
        },
        {
          title: '保证金状态',
          key: 'bondState',
          render: (h, params) => {
            return h('div', params.row.bondState + '' === '0' ? '未审核' : '通过')
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: params.row.grantState + '' === '1'
                },
                style: {
                  marginTop: '5px',
                  marginBottom: '5px'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '确认发放金已提交？',
                      onOk: () => {
                        projectAdd('', 1, params.row.id).then(res => {
                          this.$Message.success('成功')
                        }).catch(err => {
                          this.$Message.error('失败')
                        })
                      }
                    })
                  }
                }
              }, '确认发放金'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: params.row.bondState + '' === '1'
                },
                style: {
                  marginTop: '5px',
                  marginBottom: '5px'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '确认保证金已提交？',
                      onOk: () => {
                        projectAdd(1, '', params.row.id).then(res => {
                          this.$Message.success('成功')
                        }).catch(err => {
                          this.$Message.error('失败')
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
      projectGetPageList(this.pageNum, this.selectValue).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map((res) => {
          this.dataList.push({...res})
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
