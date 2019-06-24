<!-- 搜索 -->
<template>
	<div id="search">
		<header class="search_header">
			<mt-button class="search_back" icon="back" @click="onBack()"></mt-button>
			<van-search class="search_search" shape="round" placeholder="搜索商品" v-model="search" show-action>
				<div slot="action" @click="onSearch"  v-show="search">搜索</div>
			</van-search>
		</header>
		<van-tabs  @click="onClick" swipeable>
			<van-tab v-for="(title,key) in titles" :title="title" :key="key"></van-tab>
		</van-tabs>
		<div class="search_goods" v-infinite-scroll="loadMore" infinite-scroll-distance="100" v-if="goods.length!=0">
			<goods-w v-for="(g,key) in goods" 
			  class="goods_w"
			  @click="onJoin(g.id)" 
			  :key="key"
			  :price="g.price"
			  :name="g.name"
			  :img="g.img"
			  :volume="g.volume"
			/>
		</div>
		<div v-else class="search_ungoods">
			<div>喵~没有找到呢</div>
			<div>去看看热门搜索吧!</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name:"search",
	data () {
		return {
			search:"",
			goods:[],
			titles:["综合","价格升序","价格降序","销量"],
			btn:false,
			index:0,
			sort:0
		}
	},
	computed:{
		...mapState(["host"])
	},
	methods:{
		//搜索
		onSearch:function(){
			this.index = 0;	//第一次搜索
			this.search && this.$http.get(this.host+"/search",{"params":{
				"search":this.search,	//搜索内容
				"sort":this.sort,		//sort	0:综合	1:价格升序	2:价格降序	3:销量
				"index":this.index		
			}}).then(res => {
				if(this.result(res.data)){
					this.goods = res.data.result;
				}else if(res.data.state == 178){
					this.goods = [];
				};
			});
		},
		//无限搜索
		loadMore:function(){
			this.index++;	//无限搜索
			this.search && this.$http.get(this.host+"/search",{"params":{
				"search":this.search,	//搜索内容
				"sort":this.sort,		//sort	0:综合	1:价格升序	2:价格降序	3:销量
				"index":this.index		
			}}).then(res => {
				if(this.result(res.data)){
					this.goods = [...this.goods, ...res.data.result];
				};
			});
		},
		//返回
		onBack:function(){
			this.$router.go(-1);
		},
		//点击导航栏
		onClick:function(index, title){
			this.sort = index;
			this.index = 0;
			this.search && this.$http.get(this.host+"/search",{"params":{
				"search":this.search,	//搜索内容
				"sort":this.sort,		//sort	0:综合	1:价格升序	2:价格降序	3:销量
				"index":this.index
			}}).then(res => {
				if(this.result(res.data)){
					this.goods = res.data.result;
				}else if(res.data.state == 178){
					this.goods = [];
				};
			});
		},
		//查看商品详细信息
		onJoin:function(goods_id){
			this.$router.push(`/goods_info/${goods_id}`);
		}
	}
}
</script>

<style>
.search_header{
	background: #fff;
}
.search_back{
	background: #fff;
	border: none;
	box-shadow: none;
	position: absolute;
	top: 5px;
}
.search_search{
	width:90%;
	margin-left: 30px;
}
.search_goods{
	position: fixed;
	margin-top: 100px;
	top: 0;
	bottom: 0;
	overflow-y: auto;
	height: calc(100% - 100px);
}
.search_goods{
	background-color: #f7f7f7;
}
.search_goods .goods_w{
	background:#fff;
}
.search_ungoods{
	text-align: center;
	color: #999;
	padding-top: 50px;
}
</style>
