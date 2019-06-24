<!-- 首页 -->
<template>
	<div id="home">
		<router-view></router-view>
		<mt-tabbar fixed v-model="selected">
			<mt-tab-item id="/home/home">
				<img slot="icon" :src="/\/home\/home/.test(selected)?require('../assets/app/home_active.png'):require('../assets/app/home.png')">
				<span :class="/\/home\/home/.test(selected)?'tarbar_active':'tarbar'">精选</span>
			</mt-tab-item>
			<mt-tab-item id="/home/seedcat">
				<img slot="icon" :src="/\/home\/seedcat/.test(selected)?require('../assets/app/seedcat_active.png'):require('../assets/app/seedcat.png')">
				<span :class="/\/home\/seedcat/.test(selected)?'tarbar_active':'tarbar'">种草猫</span>
			</mt-tab-item>
			<mt-tab-item id="/home/hdconter">
				<img slot="icon" :src="/\/home\/hdconter/.test(selected)?require('../assets/app/hdconter_active.png'):require('../assets/app/hdconter.png')">
				<span :class="/\/home\/hdconter/.test(selected)?'tarbar_active':'tarbar'">活动中心</span>
			</mt-tab-item>
			<mt-tab-item id="/home/car">
				<img slot="icon" :src="/\/home\/car/.test(selected)?require('../assets/app/car_active.png'):require('../assets/app/car.png')">
				<span :class="/\/home\/car/.test(selected)?'tarbar_active':'tarbar'">购物车</span>
			</mt-tab-item>
			<mt-tab-item id="/home/me">
				<img slot="icon" :src="/\/home\/me/.test(selected)?require('../assets/app/me_active.png'):require('../assets/app/me.png')">
				<span :class="/\/home\/me/.test(selected)?'tarbar_active':'tarbar'">我</span>
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
export default {
	name:"home",
	data(){
		return {
			selected:"/home/home"
		}
	},
	watch:{
		//监听底部选项卡
		selected:function(val){
			this.$router.push(val);
		}
	},
	updated() {
		this.selected = this.$route.path;
	},
	mounted() {
		this.selected = this.$route.path;
	}
}
</script>

<style>
.tarbar{color: #8a8a8a;}
.tarbar_active{color: #d81e06;}
</style>
