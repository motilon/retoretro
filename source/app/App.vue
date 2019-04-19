<template lang="pug">
	
	.app
		router-view

</template>

<script>

export default {
	name: 'app',
	components: {},
	data(){
		return{}
	},
	methods:{},
	computed:{},
	created(){},
	mounted(){}
}
</script>

<style lang="sass">

.app
	min-height: 100vh
	min-width: 100vw
	background-size: auto 100%
	background-image: url('img/bg.jpg')

	display: flex
	justify-content: center
	align-items: center

</style>
