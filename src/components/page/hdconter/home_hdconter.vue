<!-- 活动中心 -->
<template>
	<div id="home_hdconter">
		<mt-header class="home_hdconter_header" title="活动中心"></mt-header>
		<van-tabs @click="onClick">
			<van-tab v-for="(tab,key) in menu" :key="key" :title="tab.id==0?'活动商品':tab.name"></van-tab>
		</van-tabs>
		<div class="home_hdconter_body" v-infinite-scroll="loadMore" infinite-scroll-distance="100">
			<div class="home_hdconter_goods">
				<ul class="home_hdconter_list1">
					<li v-for="(goods,key) in goods1" @click="onJoin(goods.goods_id)" :key="key">
						<goods-h
						  :name="goods.name"
						  :img="goods.img"
						  :volume="goods.volume"
						  :price="goods.price"
						/>
					</li>
				</ul>
				<ul class="home_hdconter_list2">
					<li v-for="(goods,key) in goods2" @click="onJoin(goods.goods_id)" :key="key">
						<goods-h
						  :name="goods.name"
						  :img="goods.img"
						  :volume="goods.volume"
						  :price="goods.price"
						/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name:"home_hdconter",
	data(){
		return {
			menu:[],
			goods1:[],
			goods2:[],
			index:0
		}
	},
	computed:{
		...mapState(["host"])
	},
	created() {
		//获取活动商品类型列表
		this.$http.get(this.host+"/home/hdconter").then((res)=>{
			if(this.result(res.data)){
				this.menu = res.data.result;
				this.onClick(this.index);
			}else if(res.data.state == 133){
				this.menu = [];
			};
		});
	},
	methods:{
		//点击导航栏
		onClick:function(index) {
			this.index = index;
			this.$http.get(this.host+"/home/hdconter",{"params":{
				"menu_id":this.menu[index].id		//商品类型id
			}}).then((res)=>{
				var result = res.data.result;
				if(this.result(res.data)){
					this.goods1 = result.slice(0,Math.floor(result.length/2));
					this.goods2 = result.slice(Math.floor(result.length/2),result.length);
				}else if(res.data.state == 136){
					this.goods1 = this.goods2 = [];
				};
			});
		},
		//无限加载
		loadMore:function(){
			if(this.menu[this.index]){
				this.$http.get(this.host+"/home/hdconter",{"params":{
					"menu_id":this.menu[this.index].id		//商品类型id
				}}).then((res)=>{
					var result = res.data.result;
					if(this.result(res.data)){
						this.goods1 = result.slice(0,Math.floor(result.length/2));
						this.goods2 = result.slice(Math.floor(result.length/2),result.length);
					};
				});
			}
		},
		//查看商品详情
		onJoin:function(id){
			this.$router.push({path:`/goods_info/${id}`});
		}
	}
}
</script>

<style>
.home_hdconter_header{
	background:#D81E06;
	font-size: 18px;
}
.home_hdconter_header h1{
	line-height: 24px;
	font-weight: 500;
	font-size: 20px;
}
.home_hdconter_body{
	overflow: hidden;
	overflow-y: auto;
	height: 100%;
	position: fixed;
	top: 100;
	background: #f1f1f1;
	padding:0 15px;
}
.home_hdconter_goods{
	width: 100%;
	margin-bottom: 50px;
	display: flex;
	justify-content: space-between;
}
.home_hdconter_list1, .home_hdconter_list2{
	width: 48%;
}
.home_hdconter_list1 li, .home_hdconter_list2 li{
	margin-top: 20px;
}
</style>
