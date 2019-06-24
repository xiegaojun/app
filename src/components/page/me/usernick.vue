<!-- 修改昵称 -->
<template>
    <div id="usernick">
        <mt-header class="usernick_header" title="修改昵称">
			<mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
		</mt-header>
        <van-cell-group class="usernick_group">
		  <van-field
			v-model="usernick"
			left-icon="contact"
			label="昵称"
			@focus="onUserFocus"
			placeholder="请输入新昵称"
			:error-message="usernick_err"
		  />
		</van-cell-group>
		<div class="usernick_btn">
			<mt-button class="usernick" style="width:80%;" type="danger" @click="onUserNick">保存</mt-button>
		</div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name:"usernick",
    data() {
        return {
            usernick:"",
            usernick_err:""
        }
    },
    mounted(){
        //在输入框内填原昵称
        this.usernick = this.user.user_nick;
    },
    computed:{
        ...mapState(["host","user"])
    },
    methods: {
        ...mapMutations(["setUser"]),
        //当昵称输入框获取焦点
        onUserFocus:function(){
            this.usernick_err = "";
        },
        //修改昵称
        onUserNick:function(){
            if(!this.user){
                this.$router.push("/login");
            }else if(!this.usernick){
                this.usernick_err="昵称不能为空";
            }else if(this.user.user_nick == this.usernick){
                this.usernick_err="昵称已存在";
            }else{
                //验证新昵称是否已存在
                this.$http.get(this.host+"/usernick",{"params":{
                    "usernick":this.usernick        //新昵称
                }}).then(res => {
                    if(this.result(res.data)){//验证成功
                        //修改昵称
                        this.$http.get(this.host+"/usernick",{"params":{
                            "usernick":this.usernick,   //新昵称
                            "uid":this.user.id          //用户id
                        }}).then(res => {
                            if(this.result(res.data)){
                                this.user.user_nick = this.usernick;
                                this.setUser(this.user);//更新本地用户信息
                                this.$router.push("/userinfo");
                            }else if(res.data.state == 154){
                                this.usernick_err="昵称已存在";
                            };
                        });
                    }else if(res.data.state == 151){
                        this.usernick_err="昵称已存在";
                    };
                });
            }
        }
    }
}
</script>

<style>
.usernick_header{
	background:#D81E06;
	font-size: 18px;
}
.usernick_header h1{
	line-height: 24px;
	font-weight: 500;
}
.usernick_btn{
	margin-top:20px;
	text-align: center;
}
.usernick_group{
	margin-top:10px;
}
</style>
