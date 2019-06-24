import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode:"history",		//history模式
    routes: [
        {	//默认页面
            path: '/',
            redirect: '/home'
        },
        {	//主页
            path: '/home',
            component: resolve => require(["../components/home.vue"], resolve),
            children:[
				{	//默认页面
					path:"/home",
					redirect:"/home/home"
				},
                {	//精选
                    path: '/home/home',
                    component: resolve => require(["../components/page/home/home_home.vue"], resolve)
                },
				{	//种草猫
				    path: '/home/seedcat',
				    component: resolve => require(["../components/page/seedcat/home_seedcat.vue"], resolve)
				},
                {	//活动中心
                    path: '/home/hdconter',
                    component: resolve => require(["../components/page/hdconter/home_hdconter.vue"], resolve)
                },
                {	//购物车
                    path: '/home/car',
                    component: resolve => require(["../components/page/car/home_car.vue"], resolve)
                },
                {	//我
                    path: '/home/me',
                    component: resolve => require(["../components/page/me/home_me.vue"], resolve)
                }
            ]
        },
        {	//登录
            path: '/login',
            component: resolve => require(["../components/page/me/login.vue"], resolve)
		},
		{	//设置
            path: '/setting',
            component: resolve => require(["../components/page/me/setting.vue"], resolve)
		},
		{	//个人信息
            path: '/userinfo',
            component: resolve => require(["../components/page/me/userinfo.vue"], resolve)
		},
		{	//修改昵称
            path: '/usernick',
            component: resolve => require(["../components/page/me/usernick.vue"], resolve)
		},
		{	//修改密码
            path: '/userpwd',
            component: resolve => require(["../components/page/me/userpwd.vue"], resolve)
        },
		{	//注册
		    path: '/register',
		    component: resolve => require(["../components/page/me/register.vue"], resolve)
		},
		{	//待支付
		    path: '/wait_payment',
		    component: resolve => require(["../components/page/me/wait_payment.vue"], resolve)
		},
		{	//待发货
		    path: '/wait_send',
		    component: resolve => require(["../components/page/me/wait_send.vue"], resolve)
		},
		{	//待收货
		    path: '/wait_receive',
		    component: resolve => require(["../components/page/me/wait_receive.vue"], resolve)
		},
		{	//待评价
		    path: '/wait_evaluation',
		    component: resolve => require(["../components/page/me/wait_evaluation.vue"], resolve)
		},
		{	//退款、售后
		    path: '/after_sales',
		    component: resolve => require(["../components/page/me/after_sales.vue"], resolve)
		},
		{	//全部订单
		    path: '/order_all',
		    component: resolve => require(["../components/page/me/order_all.vue"], resolve)
		},
		{	//菜单
		    path: '/show_menu',
		    component: resolve => require(["../components/page/menu/show_menu.vue"], resolve)
		},
		{	//搜索
		    path: '/search',
		    component: resolve => require(["../components/page/search/search.vue"], resolve)
		},
		{	//确认订单
		    path: '/order',
		    component: resolve => require(["../components/page/car/order.vue"], resolve)
		},
		{	//交易成功
		    path: '/buy_ok/:price',
		    component: resolve => require(["../components/page/car/buy_ok.vue"], resolve)
		},
		{	//种草猫详细信息
		    path: '/home_seedcat_info/:id',
		    component: resolve => require(["../components/page/seedcat/home_seedcat_info.vue"], resolve)
		},
		{	//商品列表
		    path: '/goods/:id',
		    component: resolve => require(["../components/page/goods/goods.vue"], resolve)
		},
		{	//商品详细信息
		    path: '/goods_info/:id',
		    component: resolve => require(["../components/page/goods/goods_info.vue"], resolve)
		}
    ]
})
