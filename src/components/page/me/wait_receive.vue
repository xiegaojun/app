<!-- 待收货 -->
<template>
    <div id="wait_receive">
        <mt-header class="receive_header" fixed title="待收货">
			<mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
		</mt-header>
		<div class="receive_goods">
			<div class="is_null" v-if="order.length<=0">
				<img src="../../../assets/app/me_order_null.png" />
				<p>目前没有待收货订单</p>
			</div>
		</div>
		<div class="receive_like">
			<div class="title clear">
				<div><span></span></div>
				<div style="width: 30%;">猜你喜欢</div>
				<div><span></span></div>
			</div>
			<div v-infinite-scroll="loadMore" infinite-scroll-distance="100">
				<div class="like_goods">
					<ul class="like_list1">
						<li v-for="(goods,key) in goods1" @click="onJoin(goods.id)" :key="key">
							<goods-h
								:name="goods.name"
								:img="goods.img"
								:volume="goods.volume"
								:price="goods.price"
							/>
						</li>
					</ul>
					<ul class="like_list2">
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
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name:"wait_receive",
	data() {
		return {
			goods1:[],
			goods2:[],
			order:[]
		}
	},
	computed: {
		...mapState(["host"])
	},
	methods: {
		//查看商品详细信息
		onJoin:function(id){
			this.$router.push({path:`/goods_info/${id}`});
		},
		//无限加载
		loadMore:function(){
			this.$http.get(this.host+"/goods").then((res)=>{
				var result = res.data.result;
                if(this.result(res.data)){
                    this.goods1 = this.goods1.concat(result.slice(0,Math.floor(result.length/2)));
				    this.goods2 = this.goods2.concat(result.slice(Math.floor(result.length/2),result.length));
                }
			});
		}
	},
}
</script>

<style>
#wait_receive{
	background: #f1f1f1;
	padding: 50px 15px 0;
}
.receive_header{
	background:#ffffff;
	color: black;
	border-bottom: 1px solid #dcdcdc;
}
.receive_header h1{
	line-height: 24px;
	font-weight: 500;
}
.receive_goods{
	margin-bottom: 10px;
}
.receive_goods .is_null{
	background:#fff;
	text-align: center;
	height: 400px;
}
.receive_goods .is_null img{
	margin-top: 100px;
	margin-bottom: 20px;
}
.receive_goods .is_null p{
	line-height: 30px;
	font-size: 14px;
	color: #444;
}
.receive_like .title{
	text-align: center;
	color: #9B9B9B;
	line-height: 40px;
	font-size: 14px;
}
.receive_like .title div{
	float: left;
	width: 35%;
}
.receive_like .title div span{
	border-bottom: 1px solid #c3c3c3;
	height: 19px;
	width: 100%;
}
.receive_like .title span{
	float: left;
	width: 30%;
}
.receive_like .like_goods{
	width: 100%;
	margin-bottom: 50px;
	display:flex;
	justify-content:space-between;
}
.receive_like .like_list1, .receive_like .like_list2{
	width: 48%;
}
.receive_like .like_list1 li, .receive_like .like_list2 li{
	margin-top:20px;
}
</style>