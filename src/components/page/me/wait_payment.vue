<!-- 待支付 -->
<template>
    <div id="wait_payment">
        <mt-header class="payment_header" fixed title="待付款">
			<mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
		</mt-header>
		<div class="payment_goods">
			<div class="is_null" v-if="order.length<=0">
				<img src="../../../assets/app/me_order_null.png" />
				<p>目前没有订单需要付款</p>
			</div>
			<div v-else class="is_have">
				<van-checkbox-group v-model="order_result">
					<div v-for="(item,key) in order" :key="key" class="checkbox">
						<div style="flex:1;display:flex;justify-content:center;align-items:center;">
							<van-checkbox :name="item" checked-color="#D81E06"></van-checkbox>
						</div>
						<car :data="item" style="flex:6" @onDelete="onDelete"></car>
					</div>
				</van-checkbox-group>
				<div class="payment_order">
					<van-checkbox class="item-1" v-model="order_all" checked-color="#D81E06">全选</van-checkbox>
					<div class="item-2">合计：<span style="color:red;">&yen;{{all_price | toPrice}}</span></div>
					<div class="item-3" @click="onOrders">付款</div>
				</div>
			</div>
		</div>
		<div class="payment_like">
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
import { mapState, mapMutations } from 'vuex'
export default {
	name:"wait_payment",
	data() {
		return {
			goods1:[],
			goods2:[],
			order:[],
			order_result:[],
			order_all:false
		}
	},
	watch: {
		//监听是否全部选中
		order_result () {
			if(this.order_result.length == this.order.length){
				this.order_all = true;
			}else{
				this.order_all = false;
			}
		},
		//监听是否取消全部选中
		order_all () {
			if(this.order_all){
				this.order_result = this.order;
			}else{
				if(this.order_result.length == this.order.length) this.order_result = [];
			}
		}
	},
	created() {
		//加载待支付商品
		this.user && this.$http.get(this.host+"/getCar",{"params":{
			"uid":this.user.id,		//用户id
			"state":1				//商品状态
		}}).then(res => {
			if(this.result(res.data)){
				this.order = res.data.result;
 			};
		});
	},
	computed: {
		...mapState(["host","user"]),
		//合计选中的总价
		all_price:function(){
			var num = 0;
			for(var i = 0; i < this.order_result.length; i++){
				num += this.order_result[i].price*this.order_result[i].num;
			};
			return num;
		},
		//选中商品的订单id列表
		order_id:function(){
			var order_id = [];
			this.order_result.forEach(x => {order_id.push(x.id)});
			return order_id;
		}
	},
	methods: {
		...mapMutations(["setUser"]),
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
		},
		//支付
		onOrders:function(){
			this.user?this.order_result!=0 && this.$dialog.confirm({
				title: '提示',
				closeOnClickOverlay:true,
				confirmButtonColor:"#D81E06",
				message: `一共${this.all_price/100}元，是否购买？`
			}).then(() => {
				this.$http.get(this.host+"/buy",{"params":{
					"uid":this.user.id,			//用户id
					"order_id":this.order_id,	//订单id列表
					"price":this.all_price		//总价
				}}).then(res => {
					if(this.result(res.data)){
						this.user.points += Math.round(this.all_price/10000);
						this.setUser(this.user);//更新本地用户积分信息
						this.$router.push(`/buy_ok/${this.all_price}`);
					}
				});
			}):this.$router.push("/login");
		},
		//删除待支付商品
		onDelete:function(id){
			this.user?this.$http.get(this.host+"/delOrder",{"params":{
				"uid":this.user.id,		//用户id
				"order_id":id			//订单id
			}}).then(res => {
				if(this.result(res.data)){
					this.order = this.order.filter(x => {return x.id!=id});
				};
			}):this.$router.push("login");
		}
	},
}
</script>

<style>
#wait_payment{
	background: #f1f1f1;
	padding: 50px 15px 0;
}
.payment_header{
	background:#ffffff;
	color: black;
	border-bottom: 1px solid #dcdcdc;
}
.payment_header h1{
	line-height: 24px;
	font-weight: 500;
}
.payment_goods{
	margin-bottom: 10px;
}
.payment_goods .is_null{
	background:#fff;
	text-align: center;
	height: 400px;
}
.payment_goods .is_null img{
	margin-top: 100px;
	margin-bottom: 20px;
}
.payment_goods .is_null p{
	line-height: 30px;
	font-size: 14px;
	color: #444;
}
.payment_goods .is_have .checkbox{
	display: flex;
	margin-bottom: 10px;
	background:#fff;
}
.payment_order{
	display: flex;
	justify-content: space-around;
	background: #fff;
	position:fixed;
	bottom: 0;
	width: 100%;
	left:0;
	z-index: 100;
	height: 50px;
	line-height: 50px;
}
.payment_order .item-1{
	flex: 2;
	padding-left: 20px;
}
.payment_order .item-2{
	flex: 3;
}
.payment_order .item-3{
	line-height: 30px;
	margin-top: 10px;
	background: #D81E06;
	color: #fff;
	flex: 2;
	height: 30px;
	text-align: center;
	border-radius: 15px;
	margin-right: 10px;
}
.payment_like .title{
	text-align: center;
	color: #9B9B9B;
	line-height: 40px;
	font-size: 14px;
}
.payment_like .title div{
	float: left;
	width: 35%;
}
.payment_like .title div span{
	border-bottom: 1px solid #c3c3c3;
	height: 19px;
	width: 100%;
}
.payment_like .title span{
	float: left;
	width: 30%;
}
.payment_like .like_goods{
	width: 100%;
	margin-bottom: 50px;
	display:flex;
	justify-content:space-between;
}
.payment_like .like_list1, .payment_like .like_list2{
	width: 48%;
}
.payment_like .like_list1 li, .payment_like .like_list2 li{
	margin-top:20px;
}
</style>
