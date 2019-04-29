<template>
  <div>
    <div>
      <queryCondition @sendDataList="sendDataList" />
      <editableTables  :columns='columns' :showHeader="false" :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    </div>
    <Modal
      v-model="contractSeeState"
      :mask-closable='false'
      title="查看合同"
      width="900">
      <contractSee ref="contractSeeRef" :wId="wId"></contractSee>
    </Modal>
  </div>
</template>
<script>
  // 基本模板
  import editableTables from '_c/editableTables/editableTables.vue'
  import clonedeep from 'clonedeep'
  import { workerQuery } from '@/api/constructionOrganizationAdmin/workerAdmin/workerAdmin'
  import clickImg from '_c/clickImg'
  import { aesDecrypt } from '@/libs/util'
  import { workerType } from '@/api/public'
  // 查询组件
  import queryCondition from './components/queryCondition'
  // 查看合同
  import contractSee from './components/contractSee'
  export default({
    components: {
      editableTables,
      clickImg,
      queryCondition,
      contractSee
    },
    data () {
      return {
        columns: [
          {
            title: '基本信息',
            key: 'JBXX',
            width: 140,
            render: (h, params) => {
              return (
                <div style="padding: 5px; width: 102px; height: 126px;">
                <img src={params.row.headImage} />
              </div>
            )
            }
          },
          {
            title: '基本信息',
            key: 'JBXX',
            render: (h, params) => {
              return (
                <div>
                <div style="cursor: pointer" >
                <span style="color: #2D8cF0; font-weight: 700">{params.row.workerName} </span>
                <tooltip content="查看合同">
                  <icon on-click={this.contrac.bind(this, params.row.id)} type="ios-eye" style="font-size: 20px; color: #2D8cF0;"/>
                </tooltip>
                </div>
                <div>
                <b>民族：</b>
              <span>{params.row.nation}</span>
              </div>
              <div>
              <b>身份证号：</b>
              <span>{aesDecrypt(params.row.idCardNumber)}</span>
              </div>
              </div>
            )
            }
          },
          {
            title: '基本信息2',
            key: 'JBXX2',
            render: (h, params) => {
              return (
                <div>
                <div>
                <b>工种：</b>
              <span>{params.row.workerName}</span>
              </div>
              <div>
              <b>是否班组长：</b>
              {params.row.isTeamLeader === 1 ? <span>是</span> : <span>否</span>}
            </div>
              <div>
              <b>当前所在企业：</b>
              <span>{params.row.corpName}</span>
              </div>
              </div>
            )
            }
          },
          {
            title: '基本信息3',
            key: 'JBXX3',
            render: (h, params) => {
              return (
                <div>
                <div>
                <b>年龄：</b>
              {params.row.age ? <span>{params.row.age}</span> : <span>暂无数据</span>}
            </div>
              <div>
              <b>性别：</b>
              {params.row.gender ? <span>{params.row.gender}</span> : <span>暂无数据</span>}
            </div>
              <div>
              <b>住址：</b>
              <span>{params.row.address}</span>
              </div>
              </div>
            )
            }
          }
        ],
        // 基本参数
        dataList: [],
        // 查询参数
        selectValue: [],
        // 分页参数
        pageNum: 1,
        pageTotal: 1,
        // 需求参数
        apiState: '',
        workerTypeList: [],
        wId: '',
        rowObj: {},
        uploadSalaryState: false,
        contractSeeState: false
      }
    },
    methods: {
      // 分页查询管理员
      getList () {
        this.dataList = []
        workerQuery(this.pageNum, this.selectValue).then(res => {
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
        this.pageNum = 1
      },
      async getWorkerTypeList () {
        this.workerTypeList = await workerType().then().catch()
        this.getList()
      },
      sendDataList (e) {
        this.restoration()
        this.selectValue = e
        this.getList()
      },
      contrac (id, e) {
        console.log(e, id)
        this.contractSeeState = true
        this.$refs.contractSeeRef.getList(id)
      }
    },
    mounted () {
      // 初始化管理员列表
      this.getWorkerTypeList()
    }
  })
</script>
<style>
</style>
