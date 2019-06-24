<!-- 菜单 -->
<template>
	<div id="show_menu">
		<mt-header class="menu_header" title="菜单">
			<mt-button slot="left" icon="back" @click="onBack"></mt-button>
		</mt-header>
		<div class="menu_tab">
			<div class="menu_tab_nav">
				<ul class="menu_left">
					<li v-bind:class="{'menu_active':tab.id==index}" v-for="(tab,key) in menu" :key="key" @click="onMenuLeft(tab.id)">{{tab.name}}</li>
				</ul>
			</div>
			<div class="menu_tab_menu">
				<ul class="menu_right clear">
					<li v-for="(tab_type,key) in menu_type_filer" :key="key" @click="onJoin(tab_type.id)">
						<img :src="tab_type.img">
						<p>{{tab_type.name}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name:"show_menu",
	data(){
		return {
			menu:[],
			menu_type:{},
			menu_type_filer:[],
			index:0
		}
	},
	created(){
		//加载菜单左列表
		this.$http.get(this.host+"/showMenu").then((res)=>{
			if(this.result(res.data)){
				this.menu = res.data.result;
			};
		});
		//加载右列表
		this.onMenuLeft(this.index);
	},
	computed:{
		...mapState(["host"])
	},
	methods:{
		//返回
		onBack:function(){
			this.$router.go(-1);
		},
		//点击左菜单列表
		onMenuLeft:function(id) {
			this.index = id;
			if(this.menu_type[id]){//判断是否加载过左列表对应的右列表
				this.menu_type_filer = this.menu_type[this.index];
			}else{
				//加载左列表对应的右列表
				this.$http.get(this.host+"/showMenu",{"params":{
					"menu_id":id	//左列表对应id
				}}).then((res)=>{
					if(this.result(res.data)){
						//存入menu_type
						this.menu_type[id] = res.data.result;
						//展示右列表
						this.menu_type_filer = this.menu_type[this.index];
					}else if(res.data.state == 166){
						this.menu_type_filer = this.menu_type[this.index];
					};
				});
			}
		},
		//点击进入
		onJoin:function(id){
			this.$router.push({path:`/goods/${id}`});
		}
	}
}
</script>

<style>
.menu_header{
	background:#fff;
	font-size: 18px;
	color: #333;
}
.menu_header h1{
	line-height: 24px;
	font-weight: 500;
	font-size: 18px;
}
.menu_tab_nav{
	width: 23%;
	overflow-y: auto;
	overflow-x: hidden;
	height: 100%;
	position: fixed;
	top: 40;
	left: 0;
}
.menu_left li{
	background: #EEEEEE;
	color: #9B9B9B;
	font-size: 14px;
	line-height: 59px;
	border-bottom: 1px solid #E1E1E1;
	text-align: center;
}
.menu_left li:last-child{
	border: none;
	margin-bottom: 40px;
}
.menu_left .menu_active{
	background: #fff;
	color: #333;
}
.menu_tab_menu{
	background: #fff;
	width: 77%;
	overflow-y: auto;
	overflow-x: hidden;
	height: 100%;
	position: fixed;
	top: 40;
	left: 23%;
}
.menu_right{
	margin-bottom: 40px;
}
.menu_right li{
	float: left;
	width: 33%;
	text-align: center;
	margin: 15px 0;
}
.menu_right li img{
	width: 64px;
	height: 64px;
}
.menu_right li p{
	color: #333;
	font-size: 14px;
}
</style>
