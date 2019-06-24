<!-- 设置 -->
<template>
    <div id="setting">
        <mt-header class="setting_header" title="设置">
			<mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
		</mt-header>
		<van-cell title="个人信息" @click="onUserinfo" icon="wap-home" is-link></van-cell>
		<van-cell title="首页" to="/home/home" icon="wap-home" is-link></van-cell>
		<van-cell title="活动中心" to="/home/hdconter" icon="point-gift-o" is-link></van-cell>
		<van-cell title="购物车" to="/home/car" icon="cart-o" is-link></van-cell>
		<div style="height:10px;"></div>
		<van-cell title="通用" icon="setting-o" is-link></van-cell>
		<van-cell title="隐私" icon="browsing-history-o" is-link></van-cell>
		<div style="height:10px;"></div>
		<van-cell title="关于我们" icon="warning-o" is-link></van-cell>
		<van-cell title="反馈意见" icon="label-o" is-link></van-cell>
		<div class="setting_btn" v-show="user.id">
			<mt-button class="btn" type="danger" @click="onOutLogin">退出登录</mt-button>
		</div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
	name:"setting",
	computed:{
		...mapState(["host","user"])
	},
	methods:{
		...mapMutations(["setUser","setInit"]),
		//退出登录
		onOutLogin:function(){
			this.$http.get(this.host+"/outLogin").then(res => {
				if(this.result(res.data)){
					//清空vuex里的数据
					this.setInit();
					this.$router.push("/home/me");
				};
			});
		},
		//去往个人信息页面
		onUserinfo:function(){
			this.isLogin()?this.$router.push("/userinfo"):this.$router.push("/login");
		}
	}
}
</script>

<style>
#setting{
	background:#f1f1f1;
}
.setting_header{
	background:#D81E06;
	font-size: 18px;
}
.setting_header h1{
	line-height: 24px;
	font-weight: 500;
	font-size: 20px;
}
.setting_btn{
	background:#FFF;
	padding-top:10px;
	text-align: center;
}
.setting_btn .btn{
	width: 80%;
}
</style>


