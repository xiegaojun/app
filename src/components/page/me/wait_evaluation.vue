<!-- 待评价 -->
<template>
    <div id="wait_evaluation">
        <mt-header class="evaluation_header" fixed title="待评价">
			<mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
		</mt-header>
		<div class="evaluation_goods">
			<div class="is_null" v-if="order.length<=0">
				<img src="../../../assets/app/me_order_null.png" />
				<p>目前没有待评价订单</p>
			</div>
		</div>
		<div class="evaluation_like">
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
	name:"wait_evaluation",
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
		//查看商品详情
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
#wait_evaluation{
	background: #f1f1f1;
	padding: 50px 15px 0;
}
.evaluation_header{
	background:#ffffff;
	color: black;
	border-bottom: 1px solid #dcdcdc;
}
.evaluation_header h1{
	line-height: 24px;
	font-weight: 500;
}
.evaluation_goods{
	margin-bottom: 10px;
}
.evaluation_goods .is_null{
	background:#fff;
	text-align: center;
	height: 400px;
}
.evaluation_goods .is_null img{
	margin-top: 100px;
	margin-bottom: 20px;
}
.evaluation_goods .is_null p{
	line-height: 30px;
	font-size: 14px;
	color: #444;
}
.evaluation_like .title{
	text-align: center;
	color: #9B9B9B;
	line-height: 40px;
	font-size: 14px;
}
.evaluation_like .title div{
	float: left;
	width: 35%;
}
.evaluation_like .title div span{
	border-bottom: 1px solid #c3c3c3;
	height: 19px;
	width: 100%;
}
.evaluation_like .title span{
	float: left;
	width: 30%;
}
.evaluation_like .like_goods{
	width: 100%;
	margin-bottom: 50px;
	display:flex;
	justify-content:space-between;
}
.evaluation_like .like_list1, .evaluation_like .like_list2{
	width: 48%;
}
.evaluation_like .like_list1 li, .evaluation_like .like_list2 li{
	margin-top:20px;
}
</style>