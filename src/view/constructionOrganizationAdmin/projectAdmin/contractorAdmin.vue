<template>
  <div style="display: inline-block; margin-right: 5px">
    <Button type="primary" :disabled="disabled" size="small" @click="showModal">分包管理</Button>
    <Modal
      v-model="contractorState"
      width="700"
      title="分包管理">
      <Button type="primary" style="margin-bottom: 5px" @click="add">添加分包商</Button>
      <Table :columns="columns" :data="data"></Table>
    </Modal>
    <Modal
      v-model="showWorker"
      :mask-closable='false'
      title="查看工人"
      width="900">
      <showWorkerList ref="refShowWorker" @formState="formSuccessWorker" :pid="pidShowWorkerList"></showWorkerList>
    </Modal>
    <Modal
      v-model="contractorState"
      width="700"
      title="工人列表">
      <Button type="primary" style="margin-bottom: 5px" @click="add">添加分包商</Button>
      <Table :columns="columns" :data="data"></Table>
    </Modal>
    <Modal
      v-model="addModalWorker"
      :mask-closable='false'
      title="添加项目工人"
      width="600">
      <addProjectWorker ref="addWorker" @formState="formSuccessWorker" :did="didList" :pid="pidList"></addProjectWorker>
      <div slot="footer">
        <Button type="primary" :loading="loading" @click="addWorkerOk">提交</Button>
      </div>
    </Modal>
    <Modal
      v-model="addState"
      title="分包商添加"
      :mask-closable='false'
    >
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="projectName" label="分包名称">
          <Input v-model="formInline.projectName" style="margin-bottom: 5px" placeholder="请输入分包名称" />
        </FormItem>
        <FormItem prop="projectType" label="分包类型">
          <Input v-model="formInline.projectType" style="margin-bottom: 5px" placeholder="请输入分包类型" />
        </FormItem>
        <FormItem prop="chargeName" label="负责人姓名">
          <Input v-model="formInline.chargeName" style="margin-bottom: 5px" placeholder="请输入负责人姓名" />
        </FormItem>
        <FormItem prop="chargePhone" label="负责人电话">
          <Input v-model="formInline.chargePhone" placeholder="请输入负责人电话" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelAdd">取消</Button>
        <Button type="primary" :loading="add_loading" @click="confirmAdd">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {add, getPageList} from '@/api/constructionOrganizationAdmin/contractorAdmin/contractorAdmin'
import addProjectWorker from './addProjectWorker'
import showWorkerList from './showWorker'
export default {
  name: 'contractorAdmin',
  components: {
    addProjectWorker,
    showWorkerList
  },
  props: {
    parentId: String,
    did: String,
    pid: String,
    disabled: Boolean
  },
  data () {
    return {
      columns: [
        {
          title: '分包名称',
          key: 'projectName'
        },
        {
          title: '分包类型',
          key: 'projectType'
        },
        {
          title: '负责人姓名',
          key: 'chargeName'
        },
        {
          title: '负责人电话',
          key: 'chargePhone'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 260,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.didList = params.row.did + ''
                    this.pidList = params.row.pid + ''
                    this.addModalWorker = true
                    this.$refs.addWorker.emptyForm()
                  }
                }
              }, '添加工人'),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log(params.row.pid)
                    this.pidShowWorkerList = params.row.pid + ':' + new Date()
                    this.showWorker = true
                  }
                }
              }, '查看工人')
            ])
          }
        }
      ],
      data: [],
      contractorState: false,
      addState: false,
      add_loading: false,
      loading: false,
      addModalWorker: false,
      showWorker: false,
      pidShowWorkerList: '',
      pidList: '',
      didList: '',
      formInline: {
        projectName: '',
        projectType: '',
        chargeName: '',
        chargePhone: ''
      },
      ruleInline: {
        projectName: [
          { required: true, message: '分包名称不能为空', trigger: 'blur' }
        ],
        projectType: [
          { required: true, message: '分包类型不能为空', trigger: 'blur' }
        ],
        chargeName: [
          { required: true, message: '负责人姓名不能为空', trigger: 'blur' }
        ],
        chargePhone: [
          { required: true, message: '负责人电话不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getList () {
      this.data = []
      getPageList(this.parentId).then(res => {
        this.data = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.data.push(...res.info)
      }).catch(err => {
        console.log(err)
      })
    },
    showModal () {
      this.contractorState = true
      this.getList()
    },
    hideModal () {
      this.contractorState = false
    },
    add () {
      this.addState = true
    },
    cancelAdd () {
      this.addState = false
    },
    confirmAdd () {
      this.add_loading = true
      this.$refs['formInline'].validate((valid) => {
        if (valid) {
          add(this.formInline.projectName, this.formInline.projectType, this.formInline.chargeName, this.formInline.chargePhone, this.parentId).then(res => {
            this.add_loading = false
            this.$refs['formInline'].resetFields()
            this.$Message.success('成功')
            this.addState = false
            this.getList()
          }).catch(err => {
            this.$Message.error(err)
            this.add_loading = false
          })
        }
      })
    },
    // 添加工人 响应结果
    formSuccessWorker (e) {
      if (e) {
        this.loading = false
        this.addModalWorker = false
        // 清空表单数据
        this.$refs.addWorker.emptyForm()
      } else {
        this.loading = false
      }
    },
    addWorkerOk () {
      this.loading = true
      this.$refs.addWorker.handleSubmit('formInline')
      setTimeout(() => {
        this.loading = this.$refs.addWorker.loading
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>
