<!-- 全部订单 -->
<template>
    <div id="order_all">
        <mt-header class="all_header" fixed title="全部订单">
			<mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
		</mt-header>
        <div class="all_null" v-if="order.length<=0">
            亲，您还没有订单哦
        </div>
        <div class="all_body" v-else>
            <template v-for="(item,key) in order">
                <all-order 
                    class="all_order" 
                    :data="item" 
                    :key="key" 
                    @delOrder="delOrder" 
                    @toPayment="toPayment"
                    @toEvaluation="toEvaluation"
                    @onJoin="onJoin"
                ></all-order>        
            </template>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name:"order_all",
    data() {
        return {
            order:[]
        }
    },
    created() {
        //获取全部订单信息
        this.user && this.$http.get(this.host+"/allOrder",{"params":{
            "uid":this.user.id      //用户id
        }}).then(res => {
            if(this.result(res.data)){
                this.order = res.data.result;
            };
        });
    },
    computed: {
        ...mapState(["host","user"])   
    },
    methods: {
        ...mapMutations(["setOrder"]),
        //删除订单
        delOrder:function(order_id){
            this.user?this.$http.get(this.host+"/delCar",{"params":{
                "order_id":order_id,	    //订单id
                "uid":this.user.id		    //用户id
            }}).then(res => {
                if(this.result(res.data)){
                    this.order = this.order.filter((x,i) => {return x.id!=order_id});
                };
            }):this.$router.push("/login");
        },
        //付款
        toPayment:function(data){
            if(this.user){
                this.setOrder([data]);
				this.$router.push("/order");
            }else{
                this.$router.push("/login");
            };
        },
        //去评价
        toEvaluation:function(){
            this.$dialog.alert({
				title: "提示",
				closeOnClickOverlay:true,
        		confirmButtonColor:"#D81E06",
				message: "该功能未上线！"
			});
        },
        //查看详情
        onJoin:function(goods_id){
            this.$router.push(`/goods_info/${goods_id}`);
        }
    }
}
</script>

<style>
#order_all{
	padding: 50px 15px;
    background:#f1f1f1;
}
.all_header{
	background:#D81E06;
}
.all_header h1{
	line-height: 24px;
	font-weight: 500;
}
.all_null{
	font-size: 12px;
	color: #6b6b6b;
	text-align: center;
}
.all_body .all_order{
    margin-top:20px;
    background:#fff;
}
</style>