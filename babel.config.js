module.exports = {
  presets: [
    '@vue/app'
  ],
	plugins:[
		[
			"component",
			{
				"libraryName": "mint-ui",
				"style": true
			}
		],
		[
			"import", 
			{
				"libraryName": "vant",
				"libraryDirectory": "es",
				"style": true
			}
		]
	]
}
