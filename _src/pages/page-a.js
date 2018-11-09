import Vue from 'vue';
import Fruits from '../components/Fruits.vue';

const fruits = new Vue({
	el: '#fruits',
	render: (createElement) => {
		const config = {
			props: {
				title: 'Page A fruits'
			}
		};
		return createElement(Fruits, config);
	}
});