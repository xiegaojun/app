<!-- 全部订单单件商品组件 -->
<template>
    <div id="all_order">
        <div class="state clear">
            <span style="float:left;color:#999">{{data.modify_time}}</span>
            <span style="float:right">{{deal_info[data.state]}}</span>
        </div>
        <div class="body" @click="onJoin">
            <img class="img" :src="data.img" />
            <div class="info">
                <div class="name">{{data.name}}</div>
                <div class="price_num">
                    <div class="price">&yen;{{data.price | toPrice}}</div>
                    <div class="num">X{{data.num}}</div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="and">共{{data.num}}件商品 合计：<span style="color:red;">&yen;{{(data.price*data.num) | toPrice}}</span></div>
            <mt-button v-show="data.state==-1" class="btn" plain size="small" @click="$emit('delOrder',data.id)">删除订单</mt-button>
            <mt-button v-show="data.state==1" class="btn" type="danger" plain size="small" @click="$emit('toPayment',data)">付款</mt-button>
            <mt-button v-show="data.state==2" class="btn" plain size="small" @click="$emit('toEvaluation')">去评价</mt-button>
            <mt-button v-show="data.state==3" class="btn" plain size="small" @click="$emit('onJoin',data.goods_id)">查看详情</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    props:["data"],
    data() {
        return {
            deal_info:{
                "-1":"交易失败",
                "1":"待支付",
                "2":"交易成功",
                "3":"交易成功"
            }
        }
    },
    methods: {
        //查看详情
        onJoin:function(){
            this.$router.push(`/goods_info/${this.data.goods_id}`);
        }
    }
}
</script>

<style>
#all_order{
    padding: 0 10px 5px 5px;
}
#all_order .state{
    color: red;
    font-size: 12px;
    line-height: 30px;
    padding-right: 10px;
}
#all_order .body{
    display: flex;
    justify-content:space-between;
    height: 100px;
}
#all_order .body .img{
    flex: 7;
    width: 25px;
}
#all_order .body .info{
    flex: 13;
    padding-left: 5px;
}
#all_order .body .info .name{
    font-size: 14px;
    line-height: 20px;
    color:#444;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
}
#all_order .body .info .price_num{
    display: flex;
    justify-content: space-between;
    margin-top:10px;
}
#all_order .body .info .price_num .price{
    color: red;
    padding-left:5px;
}
#all_order .body .info .price_num .num{
    color:#999;
    padding-right:10px;
}
#all_order .bottom{
    display: flex;
    justify-content: space-between;
    height: 36px;
    margin-top:10px;
}
#all_order .bottom .and{
    padding-left:5px;
    font-size: 14px;
    color: #444;
    line-height: 36px;
}
#all_order .bottom .btn{
    margin-right: 10px;
}
</style>