<template lang="pug">

#home.home

	.home__fecha
		h2 Del 8 al 30 Abril

	.home__logo
		img(src="img/logo.png")

	.home__texto
		h4 Bonos del 5%, 10% y hasta del 15% de descuento en todas nuestras tiendas

		p Participa en stirpe.co y redímelo en cualquiera de nuestras tiendas físicas y online

	.home__marcas
		.home__marca(v-for="img in logos")
			img(:src="'img/logos/'+img")

	.home__action
		router-link.boton(:to="{name:'registro'}") 
			h6 Entrar


</template>

<script>

import Modal from '../components/Modal'

export default {
	name: 'home',
	components: {
		Modal
	},
	data(){
		return{
			logos:[
				"Equis_logo.svg",
				"U82_logo_blanco.svg",
				"Stirpe_logo.svg",
				"Travel_logo.svg",
				"Unser_logo.svg"
			]
		}
	},
	methods:{},
	computed:{},
	created(){},
	mounted(){}
}
</script>

<style lang="sass">

.home
	display: flex
	flex-direction: column
	align-items: center
	width: 80%
	span, p, h2, h4
		color: white
		text-align: center

.home__fecha


.home__marcas
	display: flex

.home__marca
	padding: 0 10px


.home__logo
	width: 300px
	margin-bottom: 15px

</style>