<template>
  <div>
    <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import { workerContractGetList } from '@/api/constructionOrganizationAdmin/workerAdmin/contractSee'
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
          title: '合同开始时间',
          key: 'startDate'
        },
        {
          title: '合同结束时间',
          key: 'endDate'
        },
       {
          title: '合同照片',
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
      ],
      // 基本参数
      dataList: [],
      // 查询参数
      selectValue: '',
      // 分页参数
      pageNum: 1,
      pageTotal: 1,
      // 需求参数
    }
  },
  methods: {
    // 分页查询管理员
    getList (wId) {
      this.dataList = []
      if (!wId) return
      workerContractGetList(wId).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.forEach(item => {
          let imgList = []
          item.attachments.forEach(item => {
            imgList.push(item.data)
          })
          this.dataList.push({
            startDate: item.startDate,
            endDate: item.endDate,
            allowPic: imgList.join(',')
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
