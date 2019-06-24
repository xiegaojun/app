<!-- 我 -->
<template>
	<div id="home_me">
		<div class="me_header">
			<div class="top">
				<div class="header_img">
					<img @click="onLogin" style="width:42px;border-radius:50%;" :src="user?user.user_header:'https://m.xiegaojun.cn/headerImg/default_header.png'">
				</div>
				<div class="name">
					<div @click="onLogin">{{(user && user.user_nick) || (user?user.user_name:'点击登录')}}</div>
					<div>山寨猫积分 {{user.points}} &gt;</div>
				</div>
				<div class="setting">
					<img @click="onSetting" src="../../../assets/app/setting.png" />
				</div>
			</div>
			<div class="bottom">
				<div @click="onFalse">
					<div class="num">2</div>
					<div class="text">收藏夹</div>
				</div>
				<div @click="onFalse">
					<div class="num">5</div>
					<div class="text">关注店铺</div>
				</div>
				<div @click="onFalse">
					<div class="num">16</div>
					<div class="text">足迹</div>
				</div>
				<div @click="onFalse">
					<div class="num">3</div>
					<div class="text">红包卡卷</div>
				</div>
			</div>
		</div>
		<div class="me_order">
			<div class="top">
				<div>我的订单</div>
				<div @click="$router.push('/order_all')">查看全部 &gt;</div>
			</div>
			<div class="bottom">
				<div @click="$router.push('/wait_payment')">
					<img src="../../../assets/app/me_order0.png" />
					<div>待付款</div>
					<van-tag color="#D81E06" class="tag" plain round v-if="order_num>0">{{order_num}}</van-tag>
				</div>
				<div @click="$router.push('/wait_send')">
					<img src="../../../assets/app/me_order1.png" />
					<div>待发货</div>
				</div>
				<div @click="$router.push('/wait_receive')">
					<img src="../../../assets/app/me_order2.png" />
					<div>待收货</div>
				</div>
				<div @click="$router.push('/wait_evaluation')">
					<img src="../../../assets/app/me_order3.png" />
					<div>待评价</div>
				</div>
				<div @click="$router.push('/after_sales')">
					<img src="../../../assets/app/me_order4.png" />
					<div>退款/售后</div>
				</div>
			</div>
		</div>
		<div class="me_like">
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
import { mapState } from "vuex"
export default {
	name:"home_me",
	data(){
		return {
			goods1:[],
			goods2:[],
			order_num:0
		}
	},
	created() {
		//获取待支付商品数量
		this.user && this.$http.get(this.host+"/getCar",{"params":{
			"uid":this.user.id,		//用户id
			"state":1							//商品状态
		}}).then(res => {
			if(this.result(res.data)){
				this.order_num = res.data.result.length;
			};
		});
	},
	computed:{
		...mapState(["host","user"])
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
		},
		//设置
		onSetting:function(){
			this.$router.push("/setting");
		},
		//登录
		onLogin:function(){
			this.user?this.$router.push("/userinfo"):this.$router.push("/login");
		},
		//提示
		onFalse:function(){
			this.$dialog.alert({
				title: "提示",
				closeOnClickOverlay:true,
        		confirmButtonColor:"#D81E06",
				message: "该功能未上线！"
			});
		}
	}
}
</script>

<style>
#home_me{
	background:#f1f1f1;
}
.me_header{
	background:#D81E06;
	color:#fff;
	height:150px;
	border-radius: 0 0 25% 25%/0 0 23% 23%;
}
.me_header .top{
	display:flex;
}
.me_header .top .header_img{
	height:70px;
	flex:2;
	display:flex;
	align-items:center;
	justify-content:center;
}
.me_header .top .name{
	flex:3;
	padding-top:10px;
}
.me_header .top .name div:nth-of-type(1){
	font-weight:600;
	font-size:20px;
}
.me_header .top .name div:nth-of-type(2){
	font-size:10px;
	padding:5px;
}
.me_header .top .setting{
	flex:5;
	text-align: right;
}
.me_header .top .setting img{
	width: 32px;
	margin-top: 10px;
	margin-right: 20px;
}
.me_header .bottom{
	margin-top:10px;
	display:flex;
	justify-content:space-around;
}
.me_header .bottom .num{
	text-align:center;
	font-size:20px;
	font-weight:600;
}
.me_header .bottom .text{
	font-size:12px;
	text-align:center;
}
.me_order{
	padding:15px;
}
.me_order .top{
	display:flex;
	justify-content:space-between;
	margin:10px 0;
}
.me_order .top div:nth-of-type(1){
	font-weight:800;
	font-size:18px;
}
.me_order .top div:nth-of-type(2){
	font-size:12px;
	color:#868686;
}
.me_order .bottom{
	display:flex;
	justify-content:space-around;
	align-items:center;
	height:80px;
	background:#fff;
	margin-bottom:10px;
}
.me_order .bottom div{
	display:flex;
	justify-content:center;
	flex-direction:column;
	align-items:center;
	position: relative;
}
.me_order .bottom .tag{
	position: absolute;
	right: -10%;
	top: -10%;
	background:#fff;
}
.me_order .bottom div img{
	width:32px;
}
.me_order .bottom div div{
	font-size:12px;
	margin-top:8px;
}
.me_like{
	padding:0 15px;
}
.me_like .title{
	text-align: center;
	color: #9B9B9B;
	line-height: 40px;
	font-size: 14px;
}
.me_like .title div{
	float: left;
	width: 35%;
}
.me_like .title div span{
	border-bottom: 1px solid #c3c3c3;
	height: 19px;
	width: 100%;
}
.me_like .title span{
	float: left;
	width: 30%;
}
.me_like .like_goods{
	width: 100%;
	margin-bottom: 50px;
	display:flex;
	justify-content:space-between;
}
.me_like .like_list1, .me_like .like_list2{
	width: 48%;
}
.me_like .like_list1 li, .me_like .like_list2 li{
	margin-top:20px;
}
</style>
