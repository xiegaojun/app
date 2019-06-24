/* eslint-disable no-mixed-spaces-and-tabs */
import Vue from 'vue'
import { Tabbar, Header, Button, TabItem, Lazyload, InfiniteScroll, Actionsheet } from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Search, Field, CellGroup, Stepper, SubmitBar, Cell, Tag, Tab, Tabs, Swipe, SwipeItem, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn, Dialog, Sku, Icon, Notify, Checkbox, CheckboxGroup } from 'vant'
import 'vant/lib/index.css'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import loading from './components/loading/index.js'
import store from './store/store.js'

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.use(Lazyload).use(InfiniteScroll);
Vue.component(Actionsheet.name, Actionsheet);
Vue.use(Search).use(Field).use(Cell).use(CellGroup).use(Tab).use(Tabs).use(Sku).use(Swipe).use(SwipeItem).use(Stepper).use(SubmitBar);
Vue.use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn).use(Dialog).use(Icon).use(Notify).use(Checkbox).use(CheckboxGroup).use(Tag);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(loading);

//过滤器 将1转换成1.00
Vue.filter('toPrice', function (x) {
  var s_x = (Math.round(parseFloat(x)) / 100).toString();
  var pos_decimal = s_x.indexOf('.');
  if (pos_decimal < 0) {
  	pos_decimal = s_x.length;
  	s_x += '.';
  }
  while (s_x.length <= pos_decimal + 2) s_x += '0';
  return s_x;
});

//跨域post请求
Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push(function(request, next) {//拦截器
  // 跨域携带cookie
  request.credentials = true;
  next()
})

Vue.config.productionTip = false

import { mapState, mapMutations } from 'vuex'
Vue.prototype.isLogin = function(){return this.user?true:false};

new Vue({
  router,
  store,
  created() {
    //自动登录
    this.$http.get(this.host+"/autoLogin").then(res => {
      if(res.data.state == 0){
        this.setUser(res.data.result);
      }
    });
  },
  computed: {
    ...mapState(["host","user"])
  },
  methods: {
    ...mapMutations(["setUser"])
  },
  render: h => h(App),
}).$mount('#app')

//状态判断
Vue.prototype.result = function(data){
  if(data.state == 0){
    return true;
  }else if(data.state == 1){
    this.$router.push("/login");
    return false;
  }else{
    //无弹窗
    if(data.state == 108) return false;   //购物车没商品
    if(data.state == 130) return false;
    if(data.state == 133) return false;   //没有活动商品
    if(data.state == 136) return false;   //没有活动商品
    if(data.state == 139) return false;   //用户名验证失败
    if(data.state == 142) return false;   //登录失败
    if(data.state == 145) return false;   //无全部订单
    if(data.state == 148) return false;   //注册失败
    if(data.state == 151) return false;   //昵称已存在
    if(data.state == 154) return false;   //修改昵称失败
    if(data.state == 166) return false;
    if(data.state == 175) return false;   //原密码不正确
    if(data.state == 178) return false;   //搜索无此类商品
    
    //有弹窗
    this.$dialog.alert({
      title: "错误"+data.state,
      closeOnClickOverlay:true,
      confirmButtonColor:"#D81E06",
      message: data.msg
    });
    return false;
  }
};