<!-- 购物车，待支付单件商品组件 -->
<template>
    <div id="car">
        <div class="car">
            <!-- 点击查看查看详情 -->
            <div class="img" @click="$router.push('/goods_info/'+data.goods_id)">
                <img style="width:100%;" :src="data.img" />
            </div>
            <div class="info">
                <!-- 点击查看查看详情 -->
                <div class="name" @click="$router.push('/goods_info/'+data.goods_id)">{{data.name}}</div>
                <!-- 点击查看查看详情 -->
                <div class="price_style" @click="$router.push('/goods_info/'+data.goods_id)">
                    <div class="style">{{data.style}}</div>
                    <div class="price">&yen;{{data.price | toPrice}}</div>
                </div>
                <div class="num_del">
                    <van-stepper class="num" v-model="data.num" @change="onChange" />
                    <mt-button class="del" type="danger" plain size="small" @click="$emit('onDelete',data.id)">删除</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props:["data"],
    computed: {
        ...mapState(["host","user"])
    },
    methods: {
        //增加或减少商品的数量
        onChange:function(num){
            this.user?this.$http.get(this.host+"/setNum",{"params":{
                "order_id":this.data.id,    //订单id
                "num":num,                  //订单数量
                "uid":this.user.id          //用户id
            }}).then(res => {
                if(!this.result(res.data)){//添加失败则退回
                    this.data.num--;
                };
            }):this.$router.push("/login");
        }   
    }
}
</script>

<style>
.car{
    display: flex;
    justify-content: space-between;
    height: 120px;
    padding: 10px 0;
}
.car .img{
    display: flex;
    align-items: center;
    flex: 7;
}
.car .info{
    flex: 13;
    display: flex;
    flex-direction: column;
    justify-content: space-between
}
.car .info .name{
    padding:5px 0 0 10px;
    font-size: 14px;
    line-height: 20px;
    color:#444;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
}
.car .info .price_style{
    display: flex;
    justify-content: space-around;
    line-height: 24px;
}
.car .info .price_style .style{
    color:#868686;
    font-size: 14px;
}
.car .info .price_style .price{
    color: red;
}
.car .info .num_del{
    display: flex;
    justify-content: space-around;
}
</style>
