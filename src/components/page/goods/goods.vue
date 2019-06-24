<!-- 商品列表 -->
<template>
	<div id="goods">
		<header class="goods_header">
			<mt-button class="goods_back" icon="back" @click="onBack()"></mt-button>
			<van-search style="width:90%;margin-left: 30px;" shape="round" placeholder="搜索商品" @click="onToSearch()" />
		</header>
		<van-tabs  @click="onClick" swipeable>
			<van-tab v-for="(title,key) in titles" :title="title" :key="key"></van-tab>
		</van-tabs>
		<div class="goods_goods" v-infinite-scroll="loadMore" infinite-scroll-distance="100" v-if="goods.length!=0">
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
		<div v-else class="goods_ungoods">
			<div>喵~没有找到呢</div>
			<div>去看看热门搜索吧!</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name:"goods",
	data(){
		return {
			id:this.$route.params.id,
			titles:["综合","价格升序","价格降序","销量"],
			goods:[]
		}
	},
	created(){
		//默认选中“综合”
		this.onClick(0);
	},
	computed:{
		...mapState(["host"])
	},
	methods:{
		//返回
		onBack:function(){
			this.$router.go(-1);
		},
		//搜索
		onToSearch:function(){
			this.$router.push("/search");
		},
		//点击导航栏
		onClick:function(index, title){
			this.$http.get(this.host+"/goods",{"params":{
				"goods_type_id":this.id,		//商品类型id
				"sort":index		//sort	0:综合	1:价格升序	2:价格降序	3:销量
			}}).then(res => {
				if(this.result(res.data)){
					this.goods = res.data.result.concat(this.goods);
				};
			});
		},
		//无限加载
		loadMore:function(){
			this.goods = this.goods.concat(this.goods);
		},
		//查看商品详情
		onJoin:function(id){
			this.$router.push({path:`/goods_info/${id}`});
		}
	}
}
</script>

<style>
#goods .goods_back{
	background: #fff;
	border: none;
	box-shadow: none;
	position: absolute;
	top: 5px;
}
#goods .goods_goods{
	position: fixed;
	margin-top: 100px;
	top: 0;
	bottom: 0;
	overflow-y: auto;
	height: 100%;
}
#goods .goods_goods{
	background-color: #f7f7f7;
}
#goods .goods_goods .goods_w{
	background:#fff;
}
#goods .goods_ungoods{
	text-align: center;
	color: #999;
	padding-top: 50px;
}
</style>
