<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <!--<Badge :dot="!!messageUnreadCount">-->
        <Avatar :src="userAvator"/>
      <!--</Badge>-->
      <Icon color="#002a19" :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <!--<DropdownItem name="message">-->
          <!--消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>-->
        <!--</DropdownItem>-->
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    },
//    messageUnreadCount: {
//      type: Number,
//      default: 0
//    }
  },
  methods: {
    // 退出登录
    ...mapActions([
      'handleLogOut'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
        this.$router.push({
          name: 'login'
        })
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
      }
    }
  }
}
</script>
