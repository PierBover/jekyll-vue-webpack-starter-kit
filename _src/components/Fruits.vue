<template>
	<div id="Fruits">
		<h2>{{title}}</h2>
		<ul>
			<li v-for="fruit in fruits">{{fruit}}</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: ['title'],
	data () {
		return {
			fruits: ['Mango', 'Apple', 'Banana']
		};
	}
};
</script>

<style lang="scss" scoped>
#Fruits {
	h2 {
		color: tomato;
	}
}
</style>
