<!-- 登录 -->
<template>
	<div id="login">
		<mt-header class="login_header" title="登录">
			<mt-button slot="left" icon="back" @click="onBack"></mt-button>
		</mt-header>
		<van-cell-group class="login_group">
		  <van-field
			v-model="username"
			left-icon="contact"
			@focus="onUserFocus"
			label="用户名"
			@blur="onUserBlur"
			label-align="center"
			placeholder="请输入账号"
			:right-icon="userOK"
			:error-message="username_err"
		  />
		  <van-field
			v-model="password"
			@focus="onPwdFocus"
			type="password"
			left-icon="closed-eye"
			label-align="center"
			label="密码"
			placeholder="请输入密码"
			:error-message="password_err"
		  />
		</van-cell-group>
		<div class="login_btn">
			<mt-button class="login_login" size="small" type="danger" @click="onLogin">登录</mt-button>
			<mt-button class="login_register" size="small" type="danger" @click="onRegister">注册</mt-button>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
	name:"login",
	data(){
		return {
			username:"",
			password:"",
			username_err:"",
			password_err:"",
			userOK:""
		}
	},
	computed:{
		...mapState(["host"])
	},
	methods:{
		...mapMutations(["setUser"]),
		//返回
		onBack:function(){
			this.$router.push("/home/me");
		},
		//当用户名输入框获得焦点
		onUserFocus:function(){
			this.username_err="";
			this.userOK = "";
		},
		//当用户名输入框失去焦点
		onUserBlur:function(){
			if(!this.username){
				this.username_err="用户名不能为空";
			}else{
				//验证用户名是否不存在
				this.$http.get(this.host+"/login",{"params":{
					"username":this.username	//用户名
				}}).then(res => {
					if(this.result(res.data)){
						this.userOK = "https://m.xiegaojun.cn/headerImg/success.png";
					}else if(res.data.state == 139){
						this.username_err="用户名不存在";
					};
				})
			}
		},
		//当密码输入框获得焦点
		onPwdFocus:function(){
			this.password_err="";
		},
		//登录
		onLogin:function(){
			if(!this.username){
				this.username_err="用户名不能为空";
			}else if(!this.password){
				this.password_err="密码不能为空";
			}else{
				this.$http.post(this.host+"/login",{
					"username":this.username,		//用户名
					"password":this.password		//密码
				}).then(res => {
					if(this.result(res.data)){
						this.setUser(res.data.result);
						this.$router.push("/home/me");
					}else if(res.data.state == 142){
						this.password_err="密码错误";
					}
				})
			}
		},
		//注册
		onRegister:function(){
			this.$router.push("/register");
		}
	}
}
</script>

<style>
.login_header{
	background:#D81E06;
	font-size: 18px;
}
.login_header h1{
	line-height: 24px;
	font-weight: 500;
	font-size: 20px;
}
.login_group{
	margin-top:10px; 
}
.login_btn{
	display: flex;
	justify-content: space-around;
	margin-top:20px;
}
.login_btn .login_login, .login_btn .login_register{
	width:30%;
}
</style>
