# app

###用vue2.0做的仿天猫app

## 技术栈

### vue2 + vuex + vue-router + vue-resource + vue-cli3.0 + ES6 + vant + mint-ui

## 后端

### 后端采用node.js制作，地址：https://github.com/xiegaojun/node

## 线上地址

### https://m.xiegaojun.cn

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```


## 状态码
```
state  -1删除订单 0购物车 1待支付 2待评价 3已评价
```
```
{
    "state":0,              //状态码
    "msg":"成功",           //状态信息
    "result":result         //请求成功后返回的结果
}
```
```
 0 成功
 1 未登录
 2 参数错误
 100 : 从数据库连接池获取连接失败       /shop_order/shop_order.js#setNum
 101 : 查询错误                       /shop_order/shop_order.js#setNum
 102 : 设置数量失败                   /shop_order/shop_order.js#setNum
 103 : 从数据库连接池获取连接失败      /goods/goods.js#goods
 104 : 查询错误                      /goods/goods.js#goods
 105 : 暂无商品                       /goods/goods.js#goods
 106 : 从数据库连接池获取连接失败       /shop_order/shop_order.js#getCar
 107 : 查询错误                       /shop_order/shop_order.js#getCar
 108 : 购物车没有商品                  /shop_order/shop_order.js#getCar
 109 : 从数据库连接池获取连接失败       /shop_order/shop_order.js#carToOrder
 110 : 查询错误                       /shop_order/shop_order.js#carToOrder
 111 : 提交订单失败                   /shop_order/shop_order.js#carToOrder
 112 : 从数据库连接池获取连接失败       /shop_order/shop_order.js#delCar
 113 : 查询错误                       /shop_order/shop_order.js#delCar
 114 : 删除购物车失败                 /shop_order/shop_order.js#delCar
 115 : 从数据库连接池获取连接失败       /shop_order/shop_order.js#buy
 116 : 查询错误                       /shop_order/shop_order.js#buy
 117 : 购买失败                       /shop_order/shop_order.js#buy
 118 : 从数据库连接池获取连接失败       /goods/goods.js#goodsInfo
 119 : 查询错误                       /goods/goods.js#goodsInfo
 120 : 没有这件商品                   /goods/goods.js#goodsInfo
 121 : 从数据库连接池获取连接失败       /shop_order/shop_order.js#setOrder
 122 : 查询错误                       /shop_order/shop_order.js#setOrder
 123 : 查询订单id失败                 /shop_order/shop_order.js#setOrder
 124 : 生成订单失败                   /shop_order/shop_order.js#setOrder
 125 : 从数据库连接池获取连接失败       /shop_order/shop_order.js#setCar
 126 : 查询错误                        /shop_order/shop_order.js#setCar
 127 : 加入购物车失败                 /shop_order/shop_order.js#setCar
 128 : 从数据库连接池获取连接失败       /goods/goods.js#goods
 129 : 查询错误                        /goods/goods.js#goods
 130 : 加载失败                        /goods/goods.js#goods
 131 : 从数据库连接池获取连接失败       /hdconter/hdconter.js#hdconter
 132 : 查询错误                        /hdconter/hdconter.js#hdconter
 133 : 加载失败                        /hdconter/hdconter.js#hdconter
 134 : 从数据库连接池获取连接失败       /hdconter/hdconter.js#hdconter
 135 : 查询错误                        /hdconter/hdconter.js#hdconter
 136 : 加载失败                        /hdconter/hdconter.js#hdconter
 137 : 从数据库连接池获取连接失败        /me/me.js#login
 138 : 查询错误                        /me/me.js#login
 139 : 用户名验证失败                   /me/me.js#login
 140 : 从数据库连接池获取连接失败        /me/me.js#login
 141 : 查询错误                        /me/me.js#login
 142 : 登录失败                        /me/me.js#login
 143 : 从数据库连接池获取连接失败        /shop_order/shop_order.js#allOrder
 144 : 查询错误                        /shop_order/shop_order.js#allOrder
 145 : 没有订单                        /shop_order/shop_order.js#allOrder
 146 : 从数据库连接池获取连接失败        /me/me.js#register
 147 : 查询错误                        /me/me.js#register
 148 : 注册失败                        /me/me.js#register
 149 : 从数据库连接池获取连接失败        /me/me.js#userNick
 150 : 查询错误                        /me/me.js#userNick
 151 : 昵称已存在                      /me/me.js#userNick
 152 : 从数据库连接池获取连接失败        /me/me.js#userNick
 153 : 查询错误                        /me/me.js#userNick
 154 : 修改昵称失败                    /me/me.js#userNick
 155 : 从数据库连接池获取连接失败        /shop_order/shop_order.js#delOrder
 156 : 查询错误                        /shop_order/shop_order.js#delOrder
 157 : 删除订单失败                    /shop_order/shop_order.js#delOrder
 158 : 从数据库连接池获取连接失败        /shop_order/shop_order.js#getOrder
 159 : 查询错误                        /shop_order/shop_order.js#getOrder
 160 : 无此订单                       /shop_order/shop_order.js#getOrder
 161 : 从数据库连接池获取连接失败        /goods/goods.js#showMenu
 162 : 查询错误                        /goods/goods.js#showMenu
 163 : 无数据                         /goods/goods.js#showMenu
 164 : 从数据库连接池获取连接失败        /goods/goods.js#showMenu
 165 : 查询错误                        /goods/goods.js#showMenu
 166 : 无数据                         /goods/goods.js#showMenu
 167 : 从数据库连接池获取连接失败        /seedcat/seedcat.js#seedcat
 168 : 查询错误                        /seedcat/seedcat.js#seedcat
 169 : 无数据                         /seedcat/seedcat.js#seedcat
 170 : 从数据库连接池获取连接失败        /seedcat/seedcat.js#seedcat
 171 : 查询错误                        /seedcat/seedcat.js#seedcat
 172 : 无数据                         /seedcat/seedcat.js#seedcat
 173 : 从数据库连接池获取连接失败        /me/me.js#userPwd
 174 : 查询错误                        /me/me.js#userPwd
 175 : 原密码不正确                     /me/me.js#userPwd
 176 : 从数据库连接池获取连接失败        /search/search.js#search
 177 : 查询错误                        /search/search.js#search
 178 : 无此类商品                      /search/search.js#search
 179 : 修改用户头像名失败               /me/me.js#userHeader
 ```
