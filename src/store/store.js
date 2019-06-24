import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
	host:"http://192.168.0.104:9000/req",//请自行搭好后台
	user:"",
	car_len:0,
	order:{}
}
const getters = {

}
const mutations = {
	setUser (state,user) {
		state.user = user;
	},
	setCarLen (state, car_len) {
		state.car_len = car_len;
	},
	setOrder (state, order) {
		state.order = order;
	},
	setInit (state) {
		state.user = "";
		state.car_len = 0;
		state.order = {};
	}
} 
const actions = {
	setUser ({ commit }) {
		commit("setUser");
	},
	setCarLen ({ commit }) {
		commit("setCarLen");
	},
	setOrder ({ commit }) {
		commit("setOrder");
	},
	setInit ({ commit }) {
		commit("setInit");
	}
}
 
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});