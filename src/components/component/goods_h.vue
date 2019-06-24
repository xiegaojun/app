<template>
	<div id="goods_h" @click="$emit('click')">
		<img :src="img" />
		<p>{{name}}</p>
		<div class="clear">
			<span class="price">&yen;{{price | toPrice}}</span>
			<span class="volume">销量{{volume}}笔</span>
		</div>
	</div>
</template>

<script>
export default {
	props:["name","img","volume","price"]
}
</script>

<style>
#goods_h {
	background: #fff;
	border-radius: 8px;
	padding-bottom: 8px;
}
#goods_h img{
	width: 100%;
	border-radius: 8px;
}
#goods_h p{
	overflow:hidden;
    text-overflow:ellipsis;
    display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	margin-bottom: 5px;
	padding: 0 5px;
	font-size: 14px;
}
#goods_h div{
	position: relative;
}
#goods_h .price{
	color: #D81E06;
	float: left;
	margin-left: 8px;
}
#goods_h .volume{
	color: #555;
	font-size: 14px;
	margin-right: 8px;
	position: absolute;
	bottom: 0;
	right: 0;
}
</style>
