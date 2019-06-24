<template>
  <div id="app">
		<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html{
	height: 100%;
}
h1,h2,ul,p,li,hr{
	margin: 0;
	padding: 0;
	list-style: none;
	font-weight: normal;
}
.clear:after{
	content: "";
	display: block;
	clear: both;
}
</style>
