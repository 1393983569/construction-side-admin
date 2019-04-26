<template>
    <div>
      <div>
        {{title}}
      </div>
      <template v-for="(item, index) in dataList">
        <div class="div-box">
          <Input v-model="dataList[index].name" @onChange="onChangeInput" placeholder="请输入附件名称" />
          <!--删除-->
          <Icon type="ios-close-circle-outline" class="iconDel" @click="delList(index)" />
          <section style="width: 200px">
            <!--<uploadMultiple @succeedOk="imgSucceed" v-model="dataList[index].dataImg" style="display: inline-block"/>-->
            <Upload :action="`${configUrl}/projectCorpTeam/importFile`"
                    :on-success="fileSuccess"
                    type="drag"
                    style="display: inline-block; vertical-align: top; margin-top: 10px"
                    :before-upload="handleBeforeUpload"
                    :format="['jpg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx']"
                    :on-format-error="onFormat"
                    :on-remove="onRemoveList"
            >
              <Button icon="ios-cloud-upload-outline" @click="indexData = index" :disabled="dataList[index].name === ''" >上传文件</Button>
            </Upload>
          </section>
        </div>
      </template>
      <!--添加模块-->
      <Icon class="icon" type="ios-add-circle-outline" @click="clickIcon" />
    </div>
</template>

<script>
  import uploadMultiple from '_c/uploadMultiple'
  import config from '@/config'
  export default {
    name: "accessory",
    components: {
      uploadMultiple
    },
    props: {
      value: Array,
      title: String
    },
    data () {
      return {
        dataList: [
          {
            name: '',
            data: ''
          }
        ],
        indexData: '',
        configUrl: config.baseUrl.pro.replace("http:", ""),
      }
    },
    methods: {
      clickIcon () {
        if (this.dataList.length < 5) {
          this.dataList.push({
            name: '',
            data: ''
          })
        } else {
          this.$Message.error('只能添加5个附件')
        }
      },
      delList (index) {
        this.dataList.splice(index, 1)
        this.$emit('input', this.dataList)
      },
      fileSuccess (response, file, fileList) {
        this.disposeArr(response.info)
      },
      onChangeInput () {
        this.disposeArr(this.dataList)
        this.$emit('input', this.dataList)
      },
      // 判断是否超出最大文件设置
      handleBeforeUpload (e) {
        if (this.dataList[this.indexData].data) {
          this.$Notice.warning({
            title: `最多上传1个文件！`
          })
          return false
        }
      },
      // 判断格式
      onFormat (file) {
        console.log(file)
        this.$Notice.warning({
          title: `文件${file.name}格式不正确`
        })
      },
      // 添加数据
      disposeArr (data) {
        this.dataList[this.indexData].data = data
        this.$emit('input', this.dataList)
      },
      // 删除已上传
      onRemoveList (file, fileList) {
        this.dataList.forEach((item, index) => {
          if (file.response.info === item.data) {
            this.dataList.splice(index, 1)
          }
        })
        this.$emit('input', this.dataList)
      }
    }
  }
</script>

<style scoped>
.icon{
  font-size: 24px;
  cursor: pointer;
  color: #348EED;
  display: block;
  width: 20px;
  margin-top: 8px;
}
.iconDel{
  display: inline-block;
  position: absolute;
  top: 12px;
  right: -18px;
  font-size: 16px;
  cursor: pointer;
  vertical-align: center;
  color: rgb(236, 36, 31);
}
.div-box{
  position: relative;
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
  margin-top: 5px;
}
</style>
