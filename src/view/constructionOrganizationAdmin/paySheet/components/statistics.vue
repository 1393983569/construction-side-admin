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
import { statisticGetPageList } from '@/api/constructionOrganizationAdmin/paySheet/paySheet'
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
          title: '应出勤天数',
          key: 'shouldAtten'
        },
        {
          title: '全勤天数',
          key: 'fullAtten'
        },
        {
          title: '迟到分钟',
          key: 'lateMinute'
        },
        {
          title: '迟到次数',
          key: 'lateNum'
        },
        {
          title: '早退分钟',
          key: 'leaveEarlyMinute'
        },
        {
          title: '早退次数',
          key: 'leaveEarlyNum'
        },
        {
          title: '加班小时',
          key: 'overtimeHours'
        },
        {
          title: '旷工天数',
          key: 'absenteeismDays'
        },
        {
          title: '未刷次数',
          key: 'notBrushNum'
        },
        {
          title: '签到次数',
          key: 'signNum'
        },
        {
          title: '出差天数',
          key: 'businessTrip'
        },
        {
          title: '病假天数',
          key: 'sickLeave'
        },
        {
          title: '事假天数',
          key: 'thingLeave'
        },
        {
          title: '应发工资',
          key: 'payableSal'
        },
        {
          title: '预支工资',
          key: 'advanceSal'
        },
        {
          title: '实发工资',
          key: 'realSal'
        },
        {
          title: '导入时间',
          key: 'createTime'
        }
      ],
      // 基本参数
      dataList: [],
      // 查询参数
      selectValue: '',
      // 分页参数
      pageNum: 1,
      pageTotal: 1,
      // 需求参数
      // 开始时间
      startDate: '',
      // 结束时间
      endDate: '',
      pId: '',
      wId: ''
    }
  },
  methods: {
    // 分页查询管理员
    getList () {
      this.dataList = []
      statisticGetPageList(this.pageNum, this.pId, this.wId, this.selectValue, this.startDate, this.endDate).then(res => {
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
  }
})
</script>
<style>
</style>
