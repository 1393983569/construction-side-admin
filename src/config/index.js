export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '定西市农民工权益保障系统',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   *
   *
   *
   */
  useI18n: false,
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  // homeName: 'home',
  homeName: 'home',
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    // dev: 'http://servicezhgd.yungoux.com/admin',
    dev: 'http://192.168.31.229:8081/admin',
    // pro: 'http://servicezhgd.yungoux.com/admin',
    pro: 'http://192.168.31.229:8081/admin',
    // 七牛旧图片上传组件回显地址
    qiniuUrl: 'http://qiniu-gongdi.lz-cc.com/',
    // 七牛新图片上传组件回显地址
    qiniuBaseUrl: 'http://qiniu-gongdi.lz-cc.com'
  }
}
