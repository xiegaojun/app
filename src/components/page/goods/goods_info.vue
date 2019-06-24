<!-- 商品详情 -->
<template>
	<div id="goods_info">
		<mt-header class="goods_info_header" fixed>
			<mt-button class="back" slot="left" icon="back" @click="onBack"></mt-button>
			<mt-button class="car" slot="right" @click="toCar()">
				<img src="../../../assets/app/car_fff.png" slot="icon" width="20" height="20" />
			</mt-button>
		</mt-header>
		<van-swipe :autoplay="3000">
			<van-swipe-item v-for="(image,key) in goods_info.images" :key="key">
				<img style="width:100%;" v-lazy="image" />
			</van-swipe-item>
		</van-swipe>
		<div class="goods_info">
			<div class="price">&yen;{{goods_info.price | toPrice}}</div>
			<h1>{{goods_info.name}}</h1>
			<div class="info">
				<span>快递: {{goods_info.express | toPrice}}</span>
				<span>月销: {{goods_info.volume}}</span>
				<span>{{goods_info.address}}</span>
			</div>
		</div>
		<div class="weal">
			<div style="color:#999;flex:1;text-align:center;">优惠</div>
			<div style="flex:4;">
				<div>下单再返17.98元红包，分享提现</div>
				<div style="color:red;font-size:12px;">满99减10元 | 满199减30元</div>
			</div>
		</div>
		<div class="weal" style="margin-bottom:70px;">
			<div style="color:#999;flex:1;text-align:center;">
				<div>福利</div>
				<div>服务</div>
			</div>
			<div style="flex:4;">
				<div>邀请新用户下单即得5元，多邀请多得</div>
				<div>全场包邮 · 平台保价 · 正品保证 · 24小时发货</div>
			</div>
		</div>
		<van-goods-action>
			<van-goods-action-mini-btn icon="chat-o" text="客服" @click="onChat()" />
			<van-goods-action-mini-btn :info="car_num" icon="cart-o" text="购物车" @click="toCar()" />
			<van-goods-action-big-btn :disabled="goods_info.volume<=0" text="加入购物车" @click="onSku()" />
			<van-goods-action-big-btn :disabled="goods_info.volume<=0" primary text="立即购买" @click="onSku()" />
		</van-goods-action>
		<van-sku
		  v-model="showSku"
		  :sku="sku"
		  :goods="goods"
		  :goods-id="id"
		  close-on-click-overlay
		  @buy-clicked="onBuyClicked"
	      @add-cart="onAddCartClicked"
		/>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
	name:"goods_info",
	data(){
		return {
			id:this.$route.params.id,
			goods_info:{},
			car_num:"",
			showSku:false,
			style:["款式1","款式2","款式3"],
			sku: {
			  tree: [
					{
						k: '款式', // skuKeyName：规格类目名称
						v: [
							{
								id: '0',
								name: '款式1',
								imgUrl: 'https://img.yzcdn.cn/2.jpg'
							},
							{
								id: '1', // skuValueId：规格值 id
								name: '款式2', // skuValueName：规格值名称
								imgUrl: 'https://img.yzcdn.cn/2.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
							},
							{
								id: '2',
								name: '款式3',
								imgUrl: 'https://img.yzcdn.cn/2.jpg'
							}
						],
						k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
					}
			  ],
			  list: [
					{
						s1: '0', // 规格类目 k_s 为 s1 的对应规格值 id
					},
					{
						s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
					},
					{
						s1: '2', // 规格类目 k_s 为 s1 的对应规格值 id
					}
			  ], 
			  price: '9999', // 默认价格（单位元）
			  stock_num: 0, // 商品总库存
			  none_sku: false, // 是否无规格商品
			  hide_stock: false // 是否隐藏剩余库存
			},
			goods: {
			  title: '测试商品',
			  picture: 'https://img.yzcdn.cn/2.jpg'
			}
		}
	},
	created() {
		//加载商品详细信息
		this.$http.get(this.host + "/goodsInfo",{"params":{
			id:this.id		//商品id
		}}).then(res => {
			if(this.result(res.data)){
				var result = res.data.result;
				result[0].images = [result[0].img1,result[0].img2,result[0].img3,result[0].img4,result[0].img5]
				this.goods_info = result[0];
				this.goods.title = result[0].name;
				this.goods.picture = result[0].img1;
				this.sku.price = result[0].price/100;
				this.sku.stock_num = result[0].volume;
				this.sku.tree[0].v.map(function(x,i){
					x["imgUrl"] = result[0]["img"+(i+1)];
				});
				this.sku.list.map(function(x,i){
					x["price"] = result[0].price + 8*i*100;
					x["stock_num"] = result[0].volume;
				});
			};
		});
		//加载购物车商品数量
		this.user && this.$http.get(this.host+"/getCar",{"params":{
			"uid":this.user.id,		//用户id
			"state":0							//商品状态
		}}).then(res => {
			if(this.result(res.data)){
				this.setCarLen(res.data.result.length);
			}
		});
	},
	mounted(){
		//显示购物车数量
		this.car_num = this.car_len || "";
	},
	computed:{
		...mapState(["host","user","car_len"])
	},
	methods:{
		...mapMutations(["setCarLen","setOrder"]),
		//返回
		onBack:function(){
			this.$router.go(-1);
		},
		//去购物车
		toCar:function(){
			this.$router.push("/home/car");
		},
		//客服
		onChat:function(){
			this.$dialog.alert({
				title: "提示",
				closeOnClickOverlay:true,
        confirmButtonColor:"#D81E06",
				message: "该功能未上线！"
			});
		},
		//开启选择商品信息
		onSku:function(){
			this.showSku = true;
		},
		//立即购买
		onBuyClicked:function(data){
			this.user?this.$http.get(this.host+"/setOrder",{"params":{
				"uid":this.user.id,			//用户id
				"goods_id":this.id,			//商品id
				"price":data.selectedSkuComb.price,		//商品单价
				"num":data.selectedNum,								//商品数量
				"style":this.style[data.selectedSkuComb.s1],		//商品款式
				"img":this.sku.tree[0].v[data.selectedSkuComb.s1].imgUrl		//商品图片
			}}).then(res => {
				if(this.result(res.data)){
					//关闭选择商品信息
					this.showSku = false;
					//获取订单信息
					this.$http.get(this.host+"/getOrder",{"params":{
						"uid":this.user.id,				//用户id
						"order_id":res.data.result		//订单id
					}}).then(res => {
						if(this.result(res.data)){
							this.setOrder(res.data.result);
							this.$router.push("/order");
						};
					});
				};
			}):this.$router.push("/login");
		},
		//加入购物车
		onAddCartClicked:function(data){
			this.user?this.$http.get(this.host+"/setCar",{"params":{
				"uid":this.user.id,		//用户id
				"goods_id":this.id,		//商品id
				"price":data.selectedSkuComb.price,			//商品单价
				"num":data.selectedNum,									//商品数量
				"style":this.style[data.selectedSkuComb.s1],		//商品款式
				"img":this.sku.tree[0].v[data.selectedSkuComb.s1].imgUrl		//商品图片
			}}).then(res => {
				if(this.result(res.data)){
					//关闭选择商品信息
					this.showSku = false;
					//添加购物车数量
					this.setCarLen(this.car_len+1);
				};
			}):this.$router.push("/login");
		}
	},
	watch: {
		//监听购物车数量
		car_len () {
			this.car_num = this.car_len || "";
		}	
	}
}
</script>

<style>
#goods_info{
	background:#f1f1f1;
}
.goods_info_header{
	background:rgba(0,0,0,0);
	font-size: 18px;
	color: #000;
}
.goods_info_header h1{
	line-height: 24px;
	font-weight: 400;
	font-size: 16px;
}
.goods_info_header .back{
	background:rgba(0,0,0,0.3);
	width:30px;
	height:30px;
	border-radius:50%;
	color:#fff;
}
.goods_info_header .car{
	background:rgba(0,0,0,0.2);
	width:30px;
	height:30px;
	border-radius:50%;
}
.goods_info{
	padding:15px;
	background: #fff;
}
.goods_info .price{
	color:red;
	font-size:24px;
	font-weight:600;
}
.goods_info h1{
	font-size:18px;
	margin:10px 0;
}
.goods_info .info{
	display:flex;
	justify-content:space-between;
	color:#333;
	font-size:14px;
}
#goods_info .weal{
	margin-top:10px;
	display:flex;
	font-size:14px;
	background:#fff;
	padding-top:10px;
	line-height:30px;
}
</style>
