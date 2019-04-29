<template>
  <div>
    <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    <Modal
      v-model="workerSeeState"
      :mask-closable='false'
      title="培训工人"
      width="900">
        <workerSee ref="workerSeeRef" />
    </Modal>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import { trainGetPageList } from '@/api/constructionOrganizationAdmin/workerAdmin/trainSee'
import clickImg from '_c/clickImg'
import workerSee from './workerSee'
export default({
  components: {
    editableTables,
    clickImg,
    workerSee
  },
  data () {
    return {
      columns: [
        {
          title: '培训日期',
          key: 'trainingDate'
        },
        {
          title: '培训时长',
          key: 'trainingDuration'
        },
        {
          title: '培训名称',
          key: 'trainingName'
        },
        {
          title: '培训人',
          key: 'trainer'
        },
        {
          title: '培训机构',
          key: 'trainingOrg'
        },
        {
          title: '培训地址',
          key: 'trainingAddress'
        },
        // {
        //     title: '附件',
        //     key: 'allowPic',
        //     render: (h, params) => {
        //       return (
        //         <div>
        //           121
        //         </div>
        //       )
        //     }
        // },
        {
          title: '附件',
          key: 'allowPic',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginTop: '5px',
                  marginBottom: '5px'
                },
                on: {
                  click: () => {
                    this.workerSeeState = true
                    this.$refs.workerSeeRef.getList(params.row.id)
                  }
                }
              }, '查看培训工人')
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
      workerSeeState: false
    }
  },
  methods: {
    // 分页查询管理员
    getList (projectCode) {
      this.dataList = []
      console.log(projectCode)
      trainGetPageList(projectCode).then(res => {
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
