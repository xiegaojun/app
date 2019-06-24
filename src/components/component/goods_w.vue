<template>
	<div id="goods_w" class="clear" @click="$emit('click')">
		<div class="img">
			<img :src="img" />
		</div>
		<div class="content">
			<p>{{name}}</p>
			<div class="clear">
				<span class="price">&yen;{{price | toPrice}}</span>
				<span class="volume">销量{{volume}}笔</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props:["name","img","volume","price"],
	methods:{
		
	}
}
</script>

<style>
#goods_w{
	margin-top: 10px;
	height: 120px;
}
#goods_w .img{
	width: 25%;
	height: 120px;
	float: left;
	text-align: center;
}
#goods_w .img img{
	width: 80%;
}
#goods_w .content{
	float: left;
	width: 75%;
}
#goods_w .content p{
	padding: 5px 10px 10px;
	height: 60px;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
#goods_w .content .price{
	color: #D81E06;
	float: left;
	margin-left: 10px;
}
#goods_w .content .volume{
	color: #333;
	float: right;
	margin-right: 20px;
	font-size: 14px;
}
</style>
