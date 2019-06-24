<template>
	<div id="home_seedcat">
		<mt-header class="seedcat_header" fixed title="理想生活分享社区"></mt-header>
		<div class="seedcat_body" v-infinite-scroll="loadMore" infinite-scroll-distance="100">
			<h2>每天都有新发现</h2>
			<div class="seedcat_card clear">
				<ul class="seedcat_list1">
					<li v-for="(card,key) in list1" @click="join(card.id)" :key="key">
						<img v-lazy="card.img" />
						<p>{{card.title}}</p>
					</li>
				</ul>
				<ul class="seedcat_list2">
					<li v-for="(card,key) in list2" @click="join(card.id)" :key="key">
						<img v-lazy="card.img" />
						<p>{{card.title}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name:"home_seedcat",
	data () {
		return {
			data:[]
		}
	},
	computed:{
		...mapState(["host"]),
		list1:function(){
			return this.data.filter((val, i)=>{
				return i%2==0
			});
		},
		list2:function(){
			return this.data.filter((val, i)=>{
				return i%2!=0
			});
		}
	},
	methods:{
		//无限加载
		loadMore:function(){
			this.$http.get(this.host+"/home/seedcat").then((res)=>{
				if(this.result(res.data)){
					this.data = this.data.concat(res.data.result);
				};
			})
		},
		//查看详细信息
		join:function(id){
			this.$router.push({path:`/home_seedcat_info/${id}`});
		}
	}
}
</script>

<style>
#home_seedcat{
	background: #ffffff;
}
.seedcat_header{
	background:#ffffff;
	color: black;
}
.seedcat_header h1{
	line-height: 24px;
	font-weight: 500;
	font-size: 20px;
}
.seedcat_body{
	padding-top: 50px;
}
.seedcat_body h2{
	font-weight: normal;
	font-size: 18px;
	padding-left: 15px;
	margin-bottom: 10px;
}
.seedcat_card{
	width: 100%;
	margin-bottom: 50px;
}
.seedcat_list1, .seedcat_list2{
	width: 50%;
	float: left;
}
.seedcat_list1 li, .seedcat_list2 li{
	width: 90%;
	margin-bottom: 20px;
}
.seedcat_list1 li{
	margin-left: 15px;
}
.seedcat_list2 li{
	margin-left: 10px;
}
.seedcat_list1 li img, .seedcat_list2 li img{
	width: 100%;
	border-radius: 10px;
}
</style>
