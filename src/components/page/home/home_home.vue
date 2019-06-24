<!-- 精选 -->
<template>
	<div id="home_home">
		<mt-header class="home_header" fixed title="山寨猫">
			<router-link to="/show_menu" slot="left">
				<mt-button>
					<img src="../../../assets/app/show_menu.png" slot="icon" width="24" height="24" />
				</mt-button>
			</router-link>
			<router-link to="/search" slot="right">
				<mt-button icon="search" style="font-size: 14px;">搜索</mt-button>
			</router-link>
		</mt-header>
		<div class="home_body" v-infinite-scroll="loadMore" infinite-scroll-distance="100">
			<van-swipe :autoplay="3000">
				<van-swipe-item v-for="(image, index) in swipe_img" :key="index">
					<img class="home_swipe_img" v-lazy="image" />
				</van-swipe-item>
			</van-swipe>
			<div class="home_goods">
				<ul class="home_list1">
					<li v-for="(goods,key) in goods1" @click="onJoin(goods.id)" :key="key">
						<goods-h
						  :name="goods.name"
						  :img="goods.img"
						  :volume="goods.volume"
						  :price="goods.price"
						/>
					</li>
				</ul>
				<ul class="home_list2">
					<li v-for="(goods,key) in goods2" @click="onJoin(goods.id)" :key="key">
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
	name:"home_home",
	data(){
		return {
			//轮播图图片
			swipe_img:["https://gw.alicdn.com/tfs/TB1HHWbNrPpK1RjSZFFXXa5PpXa-1035-390.png_790x10000.jpg_.webp",
					   "https://gw.alicdn.com/tps/i4/TB1yQ9pQXzqK1RjSZFvSuwB7VXa.jpg_790x10000Q75.jpg_.webp",
					   "https://gw.alicdn.com/tfs/TB18VmvQG6qK1RjSZFmXXX0PFXa-1035-390.jpg_790x10000Q75.jpg_.webp",
					   "https://gw.alicdn.com/tfs/TB1swXTQAzoK1RjSZFlXXai4VXa-1035-390.png_790x10000.jpg_.webp",
					   "https://gw.alicdn.com/imgextra/i2/56/O1CN01GTUPdP1CHggy2OXfj_!!56-0-lubanu.jpg_790x10000Q75.jpg_.webp",
					   "https://gw.alicdn.com/imgextra/i1/174/O1CN01kc6VgY1D9jQi6RK2R_!!174-0-lubanu.jpg_790x10000Q75.jpg_.webp",
					   "https://gw.alicdn.com/imgextra/i1/165/O1CN01Nl9ZEM1D5brQt6d7m_!!165-0-lubanu.jpg_790x10000Q75.jpg_.webp",
					   "https://gw.alicdn.com/imgextra/i2/114/O1CN01kJFSlS1CiFfMPZSCW_!!114-0-lubanu.jpg_790x10000Q75.jpg_.webp",
					   "https://gw.alicdn.com/imgextra/i3/71/O1CN01bcuoOq1COYdRzcBxN_!!71-0-lubanu.jpg_790x10000Q75.jpg_.webp",
					   "https://gw.alicdn.com/imgextra/i1/156/O1CN01p7rSJm1D1UIkuy74i_!!156-0-lubanu.jpg_790x10000Q75.jpg_.webp"
			],
			goods1:[],
			goods2:[]
		}
	},
	computed:{
		...mapState(["host"])
	},
	methods:{
		//无限加载
		loadMore:function(){
			this.$http.get(this.host+"/goods").then((res)=>{
				var result = res.data.result;
        if(this.result(res.data)){
          this.goods1 = this.goods1.concat(result.slice(0,Math.floor(result.length/2)));
				  this.goods2 = this.goods2.concat(result.slice(Math.floor(result.length/2),result.length));
        };
			});
		},
		//查看商品详情
		onJoin:function(id){
			this.$router.push({path:`/goods_info/${id}`});
		}
	}
}
</script>

<style>
#home_home{
	background: #f1f1f1;
}
.home_header{
	background:#D81E06;
	font-size: 18px;
}
.home_header h1{
	line-height: 24px;
	font-weight: 500;
	font-size: 20px;
}
.home_body{
	margin-top: 50px;
	padding: 0 15px;
}
.home_body .home_swipe_img{
	width: 100%;
}
.home_body .van-swipe{
	height: 130px;
}
.home_goods{
	width: 100%;
	margin-bottom: 50px;
	display:flex;
	justify-content:space-between;
}
.home_list1, .home_list2{
	width: 47%;
}
.home_list1 li, .home_list2 li{
	margin-top: 20px;
}
</style>
