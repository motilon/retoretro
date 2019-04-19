<template lang="pug">
.resultados

	.resultados__logo
		img(src="img/logo.png")

	.resultados__content
		.resultados__content__container(v-if="routeResultado || storeNivel > 1")
			.resultados__content__mensaje
				h4 ¡Felicitaciones!,
					br
					| llegaste hasta el nivel {{computedNivel}}, 
					br
					| ganaste un bono de
					br
					template(v-if="computedNivel == 1") 5%
					template(v-else-if="computedNivel == 2") 10%
					template(v-else) 15% 
					|  de descuento

			.resultados__action(v-if="!cupon")
				a.boton(@click="reclamar()")
					h6 Reclamar

			.cupon-descuento(v-else)
				h4 Cupón:
				span.cupon {{cupon}}
				span Hemos enviado tu cupón al correo registrado.
					br
					| Presentalo en tienda o redime online haciendo <a href='/'>clic aquí</a>

		.resultados__content__container(v-else)
			.resultados__content__mensaje
				h4 ¡GAME OVER!
					br
					| No has logrado completar tu reto retro
					
			.resultados__action
				router-link.boton(
					:to="{name:'juego',params: {id: 1}}"
				)
					h6 Jugar de nuevo

</template>

<script>
	export default {
		name: 'Resultados',
		data(){
			return{
				cupon: null
			}
		},
		methods:{
			reclamar(){
				this.axios({
					method: 'post',
					url: 'https://stirpe.co/retoretro/ajax/result.php',
					data: {
						token: this.descuento(this.computedNivel),
						email: this.storeEmail
					}
				})
					.then( response => {
						console.log(response.data)
						this.cupon = response.data.bono
					})
					.catch( error => {
						console.log(error)
					})
			},
			descuento(val){
				return (val > 1) ? (val > 2) ? 'shd7ar9jsry4f2fj' : 'yu58pra5bnm943qk' : 'x3gv4n929rfw2a55'
			}
		},
		computed:{
			routeResultado(){
				return this.$route.params.resultado
			},
			storeNivel(){
				return this.$store.state.nivel
			},
			computedNivel(){
				return this.routeResultado ? this.storeNivel : this.storeNivel -1
			},
			storeEmail(){
				return this.$store.state.email
			},
			axios(){
				return this.$store.state.axios
			}
		},
		created(){
		}
	}
</script>

<style lang="sass">


.resultados
	display: flex
	flex-direction: column
	align-items: center

.resultados__logo
	margin-bottom: 15px
	img
		width: 350px

.resultados__content
	h1,h3,h4
		margin: 0
		text-align: center
	br
		line-height: 1em

.resultados__action
	margin-top: 25px
	display: flex
	justify-content: center


.cupon-descuento
	display: flex
	justify-content: center
	align-items: center
	margin-top: 15px
	flex-direction: column

	h1
		margin: 0
		line-height: 1em
		margin-right: 25px

	.cupon
		display: block
		font-size: 2rem
		padding: 10px
		background-color: yellow
		line-height: 1em
		color: black

	span
		font-size: 1em
		color: white

	

</style>