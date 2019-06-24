<!-- 种草猫详细信息 -->
<template>
	<div id="home_seedcat_info">
		<mt-header fixed class="home_seedcat_info_header" :title="data.title">
			<mt-button slot="left" icon="back" @click="onBack"></mt-button>
		</mt-header>
		<div class="home_seedcat_info_body">
			<h1>{{data.title}}</h1>
			<img v-lazy="data.img" />
			<p>{{data.content}}</p>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name:"home_seedcat_info",
	data(){
		return {
			id:this.$route.params.id,
			data:{}
		}
	},
	computed:{
		...mapState(["host"])
	},
	created() {
		//加载详细信息
		this.$http.get(this.host+"/home/seedcat",{"params":{
			"id":this.id	//列表id
		}}).then((res)=>{
			if(this.result(res.data)){
				this.data = res.data.result;
			};
		})
	},
	methods:{
		//返回
		onBack:function(){
			this.$router.go(-1);
		}
	}
}
</script>

<style>
#home_seedcat_info{
	background:#ffffff;
}
.home_seedcat_info_header{
	background:#ffffff;
	color: black;
	font-size: 18px;
}
.home_seedcat_info_header h1{
	line-height: 24px;
	font-weight: 500;
	font-size: 16px;
}
.home_seedcat_info_body{
	padding: 0 15px;
	padding-top: 50px;
}
.home_seedcat_info_body h1{
	font-weight:500;
	font-size: 18px;
	margin: 5px 0;
	text-align: center;
}
.home_seedcat_info_body img{
	width: 100%;
}
.home_seedcat_info_body p{
	text-indent: 2em;
	padding: 10px 0;
	line-height: 26px;
}
</style>
