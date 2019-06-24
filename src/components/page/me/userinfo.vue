<!-- 个人信息 -->
<template>
    <div id="userinfo">
        <mt-header class="userinfo_header" title="修改信息">
			<mt-button slot="left" icon="back" @click="$router.push('/home/me')"></mt-button>
		</mt-header>
		<van-cell-group class="userinfo_body">
			<van-cell title="头像"  @click="onUserHeader">
				<van-icon slot="right-icon" :name="user.user_header" />
			</van-cell>
			<van-cell title="昵称" @click="onUserNick" is-link :value="user.user_nick || '未设置'" />
			<van-cell title="修改密码" @click="onUserPwd" is-link />
		</van-cell-group>
		<mt-actionsheet
			:actions="actions"
			v-model="sheetVisible"
			cancelText="取消"
		></mt-actionsheet>
		<input id="photo" type="file" name=cover />
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
	name:"userinfo",
	data() {
		return {
			sheetVisible:false,
			actions:[
				{
					name:"相册",
					method:this.photo
				}
			]
		}
	},
	computed:{
		...mapState(["host","user"])
	},
	methods: {
		...mapMutations(["setUser"]),
		//修改昵称
		onUserNick:function(){
			this.isLogin()?this.$router.push("/usernick"):this.$router.push("/login");
		},
		//修改密码
		onUserPwd:function(){
			this.isLogin()?this.$router.push("/userpwd"):this.$router.push("/login");
		},
		//修改头像
		onUserHeader:function(){
			this.isLogin()?this.sheetVisible=true:this.$router.push("/login");
		},
		//点击相册的回调函数
		photo:function(){
			var photo = document.getElementById("photo");
			photo.onclick = function(){this.value=""};
			photo.click();
			photo.onchange = (e) => {
				var file = e.target.files[0] || e.dataTransfer.files[0];
				if(file){
					var formData = new FormData();
					formData.append("file",file);
					this.user?this.$http.post(this.host+"/userHeader",formData,{
						"headers":{"Content-Type":"multipart/form-data"}
					}).then(res => {
						if(this.result(res.data)){
							this.user.user_header = res.data.result;
							this.setUser(this.user);
							this.$dialog.alert({
								title: "提示",
								closeOnClickOverlay:true,
								confirmButtonColor:"#D81E06",
								message: "修改头像成功"
							});
						};
					}):this.$router.push("/login");
				};
			};
		}
	}
}
</script>

<style>
.userinfo_header{
	background:#D81E06;
	font-size: 18px;
}
.userinfo_header h1{
	line-height: 24px;
	font-weight: 500;
}
#photo{
	display: none;
}
</style>


