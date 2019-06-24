import goods_w from '../component/goods_w.vue'
import goods_h from '../component/goods_h.vue'
import car from '../component/car.vue'
import orderGoods from '../component/order_goods.vue'
import allORder from '../component/all_order.vue'

//所有组件注册
export default {
	install:function(vue){
		vue.component('goods-w',goods_w);
		vue.component('goods-h',goods_h);
		vue.component('car',car);
		vue.component('order-goods',orderGoods);
		vue.component('all-order',allORder);
	}
}