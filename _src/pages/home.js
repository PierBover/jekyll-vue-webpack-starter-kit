import Vue from 'vue';
import Fruits from '../components/Fruits.vue';

const fruits = new Vue({
	el: '#fruits',
	render: (createElement) => {
		const config = {
			props: {
				title: 'Home fruits'
			}
		};
		return createElement(Fruits, config);
	}
});