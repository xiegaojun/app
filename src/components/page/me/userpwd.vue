<!-- 修改密码 -->
<template>
    <div id="userpwd">
        <mt-header class="userpwd_header" title="修改密码">
			<mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
		</mt-header>
        <van-cell-group class="userpwd_group">
		  <van-field
			v-model="old_pwd"
			label="旧密码"
            type="password"
			@focus="onOldPwdFocus"
			placeholder="请输入旧密码"
			:error-message="old_pwd_err"
		  />
		  <van-field
			v-model="new_pwd"
			type="password"
			@focus="onNewPwdFocus"
			label="新密码"
			placeholder="请输入新密码"
			:error-message="new_pwd_err"
		  />
		  <van-field
			v-model="new_pwd1"
			type="password"
			label="确认新密码"
			@focus="onNewPwd1Focus"
			placeholder="请重新输入新密码"
			:error-message="new_pwd1_err"
		  />
		</van-cell-group>
		<div class="userpwd_btn">
			<mt-button class="userpwd" style="width:80%;" type="danger" @click="onUserPwd">保存</mt-button>
		</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:"userpwd",
    data() {
        return {
            old_pwd:"",
            new_pwd:"",
            new_pwd1:"",
            old_pwd_err:"",
            new_pwd_err:"",
            new_pwd1_err:""
        }
    },
    computed: {
        ...mapState(["host","user"])
    },
    methods: {
		//当旧密码输入框获取焦点
        onOldPwdFocus:function(){
            this.old_pwd_err="";
		},
		//当新密码输入框获取焦点
        onNewPwdFocus:function(){
			this.new_pwd_err = "";
			!this.old_pwd && (this.old_pwd_err="旧密码不能为空");
		},
		//当确认新密码输入框获取焦点
        onNewPwd1Focus:function(){
            !this.old_pwd && (this.old_pwd_err="旧密码不能为空");
			!this.new_pwd && (this.new_pwd_err="新密码不能为空");
			this.new_pwd1_err = "";
		},
		//修改密码
        onUserPwd:function(){
			if(!this.old_pwd){
				this.old_pwd_err="旧密码不能为空";
			}else if(!this.new_pwd){
				this.new_pwd_err="新密码不能为空";
			}else if(!this.new_pwd1){
				this.new_pwd1_err="新密码不能为空";
			}else if(this.new_pwd != this.new_pwd1){
				this.new_pwd1_err="两次密码不一致";
			}else{
				this.user?this.$http.post(this.host+"/userpwd",{
					"uid":this.user.id,			//用户id
					"oldpwd":this.old_pwd,		//旧密码
					"newpwd":this.new_pwd		//新密码
				}).then(res => {
					if(this.result(res.data)){
						this.$router.push("/login");
					}else if(res.data.state == 175){
						this.old_pwd_err = "原密码不正确";
					};
				}):this.$router.push("/login");
			}
        }
    }
}
</script>

<style>
.userpwd_header{
	background:#D81E06;
	font-size: 18px;
}
.userpwd_header h1{
	line-height: 24px;
	font-weight: 500;
}
.userpwd_btn{
	margin-top:20px;
	text-align: center;
}
.userpwd_group{
	margin-top:10px;
}
</style>