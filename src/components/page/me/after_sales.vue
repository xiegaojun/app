<!-- 退款/售后 -->
<template>
    <div id="after_sales">
        <mt-header class="sales_header" fixed title="退款/售后">
			<mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
		</mt-header>
		<div class="sales_body">亲，您还没有退款订单哦</div>
    </div>
</template>

<script>
export default {
    name:"after_sales"
}
</script>

<style>
#after_sales{
	padding: 50px 15px 0;
}
.sales_header{
	background:#D81E06;
}
.sales_header h1{
	line-height: 24px;
	font-weight: 500;
}
.sales_body{
	font-size: 12px;
	color: #6b6b6b;
	text-align: center;
}
</style>