<!-- 注册 -->
<template>
	<div id="register">
		<mt-header class="register_header" title="注册">
			<mt-button slot="left" icon="back" @click="onBack"></mt-button>
		</mt-header>
		<van-cell-group class="register_group">
		  <van-field
			v-model="username"
			left-icon="contact"
			label="账号"
			@focus="onUserFocus"
			@blur="onUserBlur"
			placeholder="请输入账号"
			:error-message="username_err"
		  />
		  <van-field
			v-model="password"
			type="password"
			left-icon="closed-eye"
			@focus="onPwdFocus"
			label="密码"
			placeholder="请输入密码"
			:error-message="password_err"
		  />
		  <van-field
			v-model="password1"
			type="password"
			label="确认密码"
			@focus="onPwd1Focus"
			left-icon="closed-eye"
			placeholder="请重新输入密码"
			:error-message="password1_err"
		  />
		</van-cell-group>
		<div class="register_btn">
			<mt-button class="register" style="width:80%;" type="danger" @click="onRegister">注册</mt-button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name:"register",
	data(){
		return {
			username:"",
			password:"",
			password1:"",
			username_err:"",
			password_err:"",
			password1_err:"",
			username_judge:false
		}
	},
	computed:{
		...mapState(["host"])
	},
	methods:{
		//返回
		onBack:function(){
			this.$router.go(-1);
		},
		//当用户名输入框获得焦点
		onUserFocus:function(){
			this.username_err="";
		},
		//当用户名输入框失去焦点
		onUserBlur:function(){
			if(!this.username){
				this.username_err="用户名不能为空";
			}else{
				//验证用户名是否已存在
				this.$http.get(this.host+"/login",{"params":{
					"username":this.username	//用户名
				}}).then(res => {
					if(this.result(res.data)){
						this.username_err="用户名已存在";
					}else if(res.data.state == 139){
						this.username_judge=true;
					}
				})
			}
		},
		//当密码输入框获得焦点
		onPwdFocus:function(){
			this.password_err = "";
		},
		//确认当密码输入框获得焦点
		onPwd1Focus:function(){
			!this.username && (this.username_err="用户名不能为空");
			!this.password && (this.password_err="密码不能为空");
			this.password1_err = "";
		},
		//注册
		onRegister:function(){
			if(!this.username){
				this.username_err="用户名不能为空";
			}else if(!this.password){
				this.password_err="密码不能为空";
			}else if(!this.password1){
				this.password1_err="密码不能为空";
			}else if(this.password != this.password1){
				this.password1_err="输入的密码不一致";
			}else{
				if(this.username_judge){//判断用户名是否已存在
					this.$http.post(this.host+"/register",{
						username:this.username,		//用户名
						password:this.password		//密码
					}).then(res => {
						if(this.result(res.data)){
							this.$router.push("/login");
						}else if(res.data.state == 148){
							this.username_err="用户名已存在";
						}
					})
				}else{
					this.username_err="用户名已存在";
				}
			}
		}
	}
}
</script>

<style>
.register_header{
	background:#D81E06;
	font-size: 18px;
}
.register_header h1{
	line-height: 24px;
	font-weight: 500;
}
.register_btn{
	margin-top:20px;
	text-align: center;
}
.register_group{
	margin-top:10px;
}
</style>
