<template>
  <div>
    <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    <Modal
      v-model="modalPassword"
      :closable="false"
      title="修改密码">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="accountName" label="账号">
          <Input v-model="formInline.accountName" placeholder="输入账号" style="width: 300px" />
        </FormItem>
        <FormItem prop="accountPass" label="旧密码">
          <Input v-model="formInline.accountPass" placeholder="输入旧密码" style="width: 300px" />
        </FormItem>
        <FormItem prop="newPass" label="新密码">
          <Input v-model="formInline.newPass" placeholder="输入新密码" style="width: 300px" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelFrom">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="handleSubmit('formInline')">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import { getAdmins, editPsw } from '@/api/zjjAdmin/userAdmin'
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
          title: '账号',
          key: 'accountName'
        },
        {
          title: '名称',
          key: 'accountTitle',
          render: (h, params) => {
            return (
              <div>{params.row.sysAccountInfoDomain.accountTitle}</div>
            )
          }
        },
        {
          title: '添加时间',
          key: 'createTime'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 200,
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
                    this.modalPassword = true
                  }
                }
              }, '修改密码')
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
      modalPassword: false,
      modalUser: false,
      modal_loading: false,
      formInline: {
        accountName: '',
        accountPass: '',
        newPass: ''
      },
      ruleInline: {
        accountName: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        accountPass: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 分页查询管理员
    getList () {
      this.dataList = []
      getAdmins(this.pageNum, this.selectValue).then(res => {
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
      this.pageNum = 1
    },
    handleSubmit (name) {
      this.modal_loading = true
      this.$refs[name].validate((valid) => {
        if (valid) {
          editPsw(this.formInline.accountName, this.formInline.accountPass, this.formInline.newPass).then(res => {
            this.$Message.success('成功')
            this.$refs.formInline.resetFields()
            this.modalPassword = false
            this.modal_loading = false
          }).catch(err => {
            this.$Message.error(err)
            this.modal_loading = false
          })
        } else {
          this.$Message.error('请完善信息')
          this.modal_loading = false
        }
      })
    },
    cancelFrom () {
      this.$refs.formInline.resetFields()
      this.modalPassword = false
      this.modal_loading = false
      this.modalPassword = false
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
