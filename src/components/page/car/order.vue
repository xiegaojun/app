<!-- 确认订单 -->
<template>
    <div id="order">
        <mt-header class="order_header" title="确认订单">
			<mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
		</mt-header>
        <div class="body">
            <order-goods class="order-goods" v-for="(o,key) in order" :key="key" :data="o"></order-goods>
        </div>
        <van-submit-bar :price="all_price" button-text="提交订单" label @submit="onSubmit" />
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name:"order",
    computed: {
        ...mapState(["host","user","order"]),
        //合计总价
        all_price:function(){
			var num = 0;
			for(var i = 0; i < this.order.length; i++){
				num += this.order[i].price*this.order[i].num;
			};
			return num;
        },
        //要提交订单id列表
        order_id:function(){
            var order_id = [];
			this.order.forEach(x => {order_id.push(x.id)});
			return order_id;
		}
    },
    methods: {
        ...mapMutations(["setUser"]),
        //提交订单
        onSubmit:function(){
            if(this.user){
                this.order!=0 && this.$dialog.confirm({
                    title: '提示',
                    closeOnClickOverlay:true,
                    confirmButtonColor:"#D81E06",
                    message: `一共${this.all_price/100}元，是否购买？`
                }).then(() => {
                    this.$http.get(this.host+"/buy",{"params":{
                        "uid":this.user.id,         //用户id
                        "order_id":this.order_id,   //订单id列表
                        "price":this.all_price      //订单总价
                    }}).then(res => {
                        if(this.result(res.data)){
                            this.user.points += Math.round(this.all_price/10000);
						    this.setUser(this.user);//更新本地用户信息
                            this.$router.push(`/buy_ok/${this.all_price}`);
                        };
                    });
                });
            }else{
				this.$router.push("/login");
			}
        }
    }
}
</script>

<style>
#order{
    background: #f1f1f1;
    height: 100%;
    padding-bottom: 50px;
}
.order_header{
	background:#D81E06;
	font-size: 18px;
}
.order_header h1{
	line-height: 24px;
	font-weight: 500;
}
#order .body{
    padding: 15px;
}
#order .body .order-goods{
    margin-top:10px;
}
</style>

