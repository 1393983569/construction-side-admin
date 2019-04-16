<template>
    <div>
      <Button type="primary" v-show="!showState" style="margin-bottom: 10px" @click="addProfessionState">添加工种</Button>
      <div v-show="showState">
        <Input v-model="profession" :disabled="disabled" placeholder="请输入名称" style="width: 300px; margin-bottom: 10px"/>
        <Button type="primary" style="margin-bottom: 10px" :loading="loading" @click="addPreserve">保存</Button>
        <Button style="margin-bottom: 10px" @click="cancel">取消</Button>
      </div>
      <div v-show="!showState">
        <Input v-model="inputValue" search @on-search="selectData" :disabled="disabled" placeholder="请输入名称" style="width: 300px; margin-bottom: 10px"/>
      </div>
      <Table :columns="columns" :data="data"></Table>
      <Page style="margin-top: 10px" :total="pageTotal * 10" @on-change="pageChange" />
    </div>
</template>
<script>
import { getPageList, edit, add } from '@/api/zjjAdmin/addProfession'
export default ({
  data () {
    return {
      columns: [
        {
          title: '工种名称',
          key: 'name'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  loading: this.data[params.index].loading
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.deleteClick(params.row.tid, params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data: [],
      modalAdd: false,
      showState: false,
      inputValue: '',
      loading: false,
      disabled: false,
      selectValue: '',
      profession: '',
      pageTotal: 1,
      pageNum: 1
    }
  },
  methods: {
    getList () {
      this.data = []
      getPageList(this.pageNum, this.selectValue).then(res => {
        this.data = []
        if (res.info === '暂无数据') {
          this.$Message.error('暂无数据')
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.forEach(item => {
          this.data.push({
            name: item.profession,
            tid: item.tid,
            loading: false
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    addProfessionState () {
      this.profession = ''
      this.showState = true
    },
    // 保存数据
    addPreserve () {
      this.loading = true
      this.disabled = true
      add(this.profession).then(res => {
        this.loading = false
        this.showState = false
        this.disabled = false
        this.$Message.success('成功')
        this.getList()
      }).catch(err => {
        console.log(err)
      })
    },
    // 取消
    cancel () {
      this.showState = ''
      this.inputValue = ''
    },
    // 删除
    deleteClick (value, index) {
      this.data[index].loading = true
      edit(value).then(res => {
        this.data[index].loading = false
        this.getList()
        // this.data.splice(index, 1)
      }).catch(err => {
        console.log(err)
      })
    },
    // 查询
    selectData (value) {
      this.selectValue = value
      this.getList()
    },
    // 分页
    pageChange (e) {
      this.pageNum = e
      this.getList()
    }
  },
  mounted () {
    this.getList()
  }
})
</script>
<style>

</style>
