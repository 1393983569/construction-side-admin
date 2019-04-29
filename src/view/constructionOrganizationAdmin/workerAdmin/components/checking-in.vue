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
import { attendance } from '@/api/constructionOrganizationAdmin/workerAdmin/checking-in'
import clickImg from '_c/clickImg'
export default({
  components: {
    editableTables,
    clickImg
  },
  // props: {
  //   wId: String
  // },
  data () {
    return {
      columns: [
        {
          title: '考工人考勤方向',
          key: 'direction',
          render: (h, params) => {
            console.log(params.row)
            return h('div', params.row.direction + '' === '1' ? '出厂' : '入场' )
          }
        },
        {
          title: '刷卡时间',
          key: 'date'
        },
        {
          title: '时间段',
          key: 'date',
           render: (h, params) => {
             return h('div', this.getDateName(params.row.date))
           }
        },
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
    getList (e) {
      this.dataList = []
      if (!e) return
      attendance(this.pageNum, e).then(res => {
        console.log(res)
        try {
          this.dataList = []
          if (res.info === '暂无数据') {
            this.pageTotal = 1
            return
          }
          this.pageTotal = res.info.pageTotal
          this.dataList.push(...res.info.data)
        } catch(e) {
          console.log(e)
        }
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
    },
    getDateName (date) {
      let now = new Date(date)
      let hour = now.getHours()
      if(hour < 6){return"凌晨"}
      else if (hour < 9){return"早上"}
      else if (hour < 12){return"上午"}
      else if (hour < 14){return"中午"}
      else if (hour < 17){return"下午"}
      else if (hour < 19){return"傍晚"}
      else if (hour < 22){return"晚上"}
      else {return"夜里"}
    }
  },
  mounted () {
    // 初始化管理员列表
    this.getList()
  }
  // watch: {
  //   wId (e) {
  //     this.getList()
  //   }
  // }
})
</script>
<style>
</style>
