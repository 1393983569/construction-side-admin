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
import { queryOfWorkerTime } from '@/api/zjjAdmin/defauleShow'
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
          title: '工人姓名',
          key: 'workerName'
        },
        {
          title: '性别',
          key: 'sex',
          render: (h, params) => {
            return (
              <div>
                <span>
                  {
                    params.row.sex + '' === '0' ? '女' : '男'
                  }
                </span>
              </div>
            )
          }
        },
        {
          title: '身份证号',
          key: 'idCardNum'
        },
        {
          title: '电话',
          key: 'mobile'
        },
        {
          title: '合同照片',
          key: 'contract',
          width: 195,
          render: (h, params) => {
            return h('div', [
              h(clickImg, {
                props: {
                  rePic: params.row.contract.split(','),
                  cancelShow: false
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, 'View')
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
      pageTotal: 1,
      // 需求参数
      jsCreateTime: ''
    }
  },
  props: {
    pId: {
      default: ''
    },
    createTime: {
      default: ''
    }
  },
  methods: {
    // 分页查询工人
    getList () {
      this.dataList = []
      queryOfWorkerTime(this.pageNum, this.jsCreateTime, this.pId, this.selectValue).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map((res) => {
          this.dataList.push({
            ...res, ...res.workerDomain
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
    changeRadioGroup () {
      this.pageNum = 1
      this.getList()
    }
  },
  watch: {
    createTime (e) {
      if (e === '') return
      this.jsCreateTime = e.split('*')[0]
      this.getList()
    }
  }
})
</script>
<style>
</style>
