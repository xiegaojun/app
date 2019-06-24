<!-- 交易成功 -->
<template>
    <div id="buy_ok">
        <mt-header class="ok_header" fixed>
			<mt-button slot="left" icon="back" @click="$router.go(-2)"></mt-button>
		</mt-header>
        <div class="ok_body">
            <div class="item-1">
                <img src="../../../assets/app/order_ok.png" />
                交易成功
            </div>
            <div class="item-2">本次交易获得{{Math.round($route.params.price/10000)}}个山寨猫积分</div>
            <div class="item-3">
                <div @click="$router.push('/home/home')">返回首页</div>
                <span style="width:7%;"></span>
                <div @click="onFalse">立即评价</div>
            </div>
        </div>
        <div class="ok_like">
			<div class="title">
                <div style="color:#ba9072;font-size:18px;padding-left:20px;padding-top:12px;">理想生活上手机山寨猫</div>
                <div style="color:#d1d1d1;font-size:12px;padding-left:20px;">品质护航 购物无忧</div>
            </div>
			<div v-infinite-scroll="loadMore" infinite-scroll-distance="100" style="margin-top:-40px;">
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
import { mapState } from 'vuex';
export default {
    name:"buy_ok",
    data() {
        return {
            goods1:[],
			goods2:[]
        }
    },
    computed:{
        ...mapState(["host","user"])
    },
    methods: {
        //滚动加载商品
        loadMore:function(){
			this.$http.get(this.host+"/goods").then((res)=>{
                var goods = res.data.result;
                if(this.result(res.data)){
                    this.goods1 = this.goods1.concat(goods.slice(0,Math.floor(goods.length/2)));
				    this.goods2 = this.goods2.concat(goods.slice(Math.floor(goods.length/2),goods.length));
                }
			});
        },
        //查看商品详情
		onJoin:function(id){
			this.$router.push({path:`/goods_info/${id}`});
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
#buy_ok{
    background: #f1f1f1;
    height: 100%;
    padding-bottom: 50px;
}
.ok_header{
	background:#D81E06;
	font-size: 18px;
}
.ok_header h1{
	line-height: 24px;
	font-weight: 500;
}
.ok_body{
    background: #D81E06;
    color: #fff;
    padding-bottom: 60px;
    padding-top:50px;
}
.ok_body .item-1{
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
}
.ok_body .item-1 img{
    width: 22px;
    transform: translateY(20%);
}
.ok_body .item-2{
    text-align: center;
    font-size: 12px;
    color: #fdf8d3;
    padding-top:5px;
}
.ok_body .item-3{
    display: flex;
    justify-content: center;
    margin-top:10px;
}
.ok_body .item-3 div{
    width: 20%;
    height: 30px;
    border: 0.5px solid #fdf8d3;
    color: #fdf8d3;
    border-radius: 15px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
}
.ok_like{
    padding: 0 15px;
}
.ok_like .title{
	height: 70px;
    z-index: 999;
    transform: translateY(-50%);
    background: #fff;
    border-radius: 10px;
}
.ok_like .like_goods{
	width: 100%;
	margin-bottom: 50px;
	display:flex;
	justify-content:space-between;
}
.ok_like .like_list1, .ok_like .like_list2{
	width: 48%;
}
.ok_like .like_list1 li, .ok_like .like_list2 li{
	margin-top:20px;
}
</style>
