<!-- 购物车 -->
<template>
	<div id="home_car">
		<mt-header class="home_car_header" fixed title="购物车"></mt-header>
		<div class="home_car_goods">
			<div class="is_null" v-if="car.length<=0">
				<img src="../../../assets/app/car_null.png" />
				<p>购物车竟然是空的</p>
				<p style="color: #9B9B9B;">主人再忙，也要买点什么犒赏自己~</p>
			</div>
			<div v-else class="is_have">
				<van-checkbox-group v-model="car_result">
					<div v-for="(item,key) in car" :key="key" class="checkbox">
						<div style="flex:1;display:flex;justify-content:center;align-items:center;">
							<van-checkbox :name="item" checked-color="#D81E06"></van-checkbox>
						</div>
						<car :data="item" style="flex:6" @onDelete="onDelete"></car>
					</div>
				</van-checkbox-group>
				<div class="home_car_order">
					<van-checkbox class="item-1" v-model="car_all" checked-color="#D81E06">全选</van-checkbox>
					<div class="item-2">合计：<span style="color:red;">&yen;{{all_price | toPrice}}</span></div>
					<div class="item-3" @click="onOrders">提交订单</div>
				</div>
			</div>
		</div>
		<div class="home_car_like">
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
	name:"home_car",
	data(){
		return {
			goods1:[],
			goods2:[],
			car:[],
			car_result:[],
			car_all:false
		}
	},
	watch: {
		//监听购物车的商品是否全部选中
		car_result () {
			if(this.car_result.length == this.car.length){
				this.car_all = true;
			}else{
				this.car_all = false;
			}
		},
		//监听是否取消全部选中
		car_all () {
			if(this.car_all){
				this.car_result = this.car;
			}else{
				if(this.car_result.length == this.car.length) this.car_result = [];
			}
		}
	},
	created(){
		//加载购物车
		this.user && this.$http.get(this.host+"/getCar",{"params":{
			"uid":this.user.id,		//用户id
			"state":0							//订单状态
		}}).then(res => {
			if(this.result(res.data)){
				//加载购物车数量
				this.setCarLen(res.data.result.length);
				//加载购物车商品
				this.car = res.data.result;
			}
		});
	},
	computed:{
		...mapState(["host","user","car_len"]),
		//合计选中的总价
		all_price:function(){
			var num = 0;
			for(var i = 0; i < this.car_result.length; i++){
				num += this.car_result[i].price*this.car_result[i].num;
			};
			return num;
		}
	},
	methods:{
		...mapMutations(["setCarLen","setOrder"]),
		//滚动加载商品
		loadMore:function(){
			this.$http.get(this.host+"/goods").then((res)=>{
				var result = res.data.result;
        if(this.result(res.data)){
          this.goods1 = this.goods1.concat(result.slice(0,Math.floor(result.length/2)));
					this.goods2 = this.goods2.concat(result.slice(Math.floor(result.length/2),result.length));
        }
			});
		},
		//查看商品详情
		onJoin:function(id){
			this.$router.push({path:`/goods_info/${id}`});
		},
		//提交订单
		onOrders:function(){
			var arr = [];
			//获取要提交订单的订单id列表
			this.car_result.forEach((val,i) => {
				arr.push(this.car_result[i].id);
			});
			if(arr.length > 0){
				this.user?this.$http.get(this.host+"/carToOrder",{"params":{
					"order_id_arr":arr,		//订单id列表
					"uid":this.user.id		//用户id
				}}).then(res => {
					if(this.result(res.data)){
						this.setOrder(this.car_result);
						this.$router.push("/order");
					};
				}):this.$router.push("/login");
			}
		},
		//删除购物车内单件商品
		onDelete:function(id){
      this.user?this.$http.get(this.host+"/delCar",{"params":{
				"order_id":id,				//订单id
				"uid":this.user.id		//用户id
      }}).then(res => {
				if(this.result(res.data)){
					this.car_result = this.car_result.filter(x => {return x.id!=id});
					this.car = this.car.filter(x => {return x.id!=id});
					this.setCarLen(this.car_len-1);
				};
      }):this.$router.push("/login");
    }
	}
}
</script>

<style>
#home_car{
	background: #f1f1f1;
	padding: 50px 15px 0;
}
.home_car_header{
	background:#ffffff;
	color: black;
	border-bottom: 1px solid #dcdcdc;
}
.home_car_header h1{
	line-height: 24px;
	font-weight: 500;
	font-size: 18px;
}
.home_car_goods{
	margin-bottom: 10px;
}
.home_car_goods .is_null{
	background:#fff;
	text-align: center;
	height: 300px;
}
.home_car_goods .is_null img{
	margin-top: 40px;
	margin-bottom: 20px;
}
.home_car_goods .is_null p{
	line-height: 30px;
	font-size: 14px;
}
.home_car_goods .is_have .checkbox{
	display: flex;
	margin-bottom: 10px;
	background:#fff;
}
.home_car_order{
	display: flex;
	justify-content: space-around;
	background: #fff;
	position:fixed;
	bottom: 55px;
	width: 100%;
	left:0;
	z-index: 100;
	height: 40px;
	line-height: 40px;
}
.home_car_order .item-1{
	flex: 2;
	padding-left: 20px;
}
.home_car_order .item-2{
	flex: 3;
	
}
.home_car_order .item-3{
	line-height: 30px;
	margin-top: 5px;
	background: #D81E06;
	color: #fff;
	flex: 2;
	height: 30px;
	text-align: center;
	border-radius: 15px;
	margin-right: 10px;
}
.home_car_like .title{
	text-align: center;
	color: #9B9B9B;
	line-height: 40px;
	font-size: 14px;
}
.home_car_like .title div{
	float: left;
	width: 35%;
}
.home_car_like .title div span{
	border-bottom: 1px solid #c3c3c3;
	height: 19px;
	width: 100%;
}
.home_car_like .title span{
	float: left;
	width: 30%;
}
.home_car_like .like_goods{
	width: 100%;
	margin-bottom: 50px;
	display:flex;
	justify-content:space-between;
}
.home_car_like .like_list1, .home_car_like .like_list2{
	width: 48%;
}
.home_car_like .like_list1 li, .home_car_like .like_list2 li{
	margin-top:20px;
}
</style>
