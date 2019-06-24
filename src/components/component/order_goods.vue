<!-- 确认订单单件商品组件 -->
<template>
    <div id="order_goods">
        <div class="order_goods">
            <img class="img" :src="data.img" />
            <div class="info">
                <div class="name">{{data.name}}</div>
                <div class="style">{{data.style}}</div>
                <div class="price_num">
                    <div class="price">&yen;{{data.price | toPrice}}</div>
                    <van-stepper class="num" v-model="data.num" @change="onChange" />
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
    methods:{
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
#order_goods{
    background:#fff;
    padding: 10px 5px;
}
.order_goods{
    display: flex;
    justify-content:space-around;
    height: 100px;
}
.order_goods .img{
    flex: 3;
    width: 25px;
}
.order_goods .info{
    flex: 7;
    padding-left:10px;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
}
.order_goods .info .name{
    font-size: 14px;
    line-height: 20px;
    color:#444;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
}
.order_goods .info .style{
    font-size: 14px;
    color:#868686;
}
.order_goods .info .price_num{
    display: flex;
    justify-content: space-between;
}
.order_goods .info .price_num .price{
    color: red;
    line-height: 30px;
}
.order_goods .info .price_num .num{
    padding-right:15px;
    font-size: 14px;
    color:#444;
}
</style>
