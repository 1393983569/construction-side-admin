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
import { getPageDepts } from '@/api/zjjAdmin/companyAdmin'
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
          title: '单位名称',
          key: 'deptName'
        },
        {
          title: '单位电话',
          key: 'deptPhone'
        },
        {
          title: '单位编号',
          key: 'deptNum'
        },
        {
          title: '营业执照',
          key: 'allowPic',
          width: 250,
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
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return (
              <div></div>
            )
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
