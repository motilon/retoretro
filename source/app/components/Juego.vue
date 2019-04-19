<template lang="pug">
	#juego.juego.full

		router-view

		.marcador
			.marcador__nivel
				h4 Nivel
				h1 {{routeId}}
			h2 |
			.marcador__intentos
				h4 Intentos
				h1 {{intentosLeft}}

		.tablero(:class="{nivel1 : routeId == 1, nivel2 : routeId == 2 , nivel3 : routeId == 3 }")
			.ficha(
				v-for="(card,index) in tablaFinal"
				:key="card+'-'+index"
				@click="cardClick(card,index)"
				:class="{abierta : seleccionA == card+'-'+index || seleccionB == card+'-'+index, correcta : correctas.includes(card), null : estado }"
			)
				.ficha-contenedor
					.lado-b
						img(:src="`img/botones/${imagenes[card]}.png`")

					.lado-a
						img(src="img/boton-amarillo.svg")
						// img(:src="`img/botones/${imagenes[card]}.png`")
			
		.juego__action
			router-link(:to="{name:'instrucciones'}") 
				h6 Instrucciones

</template>

<script>

const imgs = require.context('../../../public/img/botones', true, /\.png$/)
const imgKeys = imgs.keys().map(key => key.substring(2).slice(0, -4))

export default {
	name: 'Juego',
	props: {
	msg: String
	},
	data(){
		return{
			imagenes: imgKeys,
			estado: false,
			tabla: {},
			correctas: [],
			intentos: 0,
			seleccionA: "",
			seleccionB: "",
			tarjetasN1: 5,
			tarjetasN2: 6,
			tarjetasN3: 8,
			maxIntentos: 7
		}
	},
	watch:{
	},
	methods:{
		cardClick(card,cIndex){
			const app = this
			// creamos un identificador para la carta
			let cardNew = card+'-'+cIndex

			//esto es para referenciar dinamicamente el numero de tarjetas en data()
			let nTarjetas = app["tarjetasN"+this.routeId]
			
			// si estado es verdadero no se puede clickear ningun boton
			app.estado = true


			if(app.seleccionA === ""){
				//si no hay seleccionado nada asignele la seleccion a A
				app.seleccionA = cardNew
				app.estado = false
			}else{
				//si A ya tiene un valor entonces asignele la seleccion a B
				app.seleccionB = cardNew

				//contamos como intento
				app.intentos++

				//solo nesetitamos el codigo de la imagen
				let selA = app.seleccionA.split("-")[0]

				setTimeout(() => {
					//timeout para que se vean las tarjetas por un  momento
					if(card == selA){
						//si el codigo de la imagen conicide con card o 'seleccionB'
						app.correctas.push(card)
						
						if(app.correctas.length == nTarjetas){
							//gano el juego
							resetSeleccion()
							if(this.storeNivel < 3){
								this.$router.push({ name: 'juego', params: {id: this.storeNivel +1} })
								this.reset()
								this.$store.commit('storeNivel', this.storeNivel +1)
							}else{
								this.$router.push({ name: 'resultados', params: {resultado: true} })
							}	
						}
					}
					
					//reseteamos la seleccion y desbloqueamos los botones
					resetSeleccion()

					if(this.intentosLeft === 0){
						console.log("perdistes")
						//pierde por intentos
						this.$router.push({ name: 'resultados', params: { resultado: false }})
					}

				},1500)
			}
			function resetSeleccion(){
				app.seleccionA = ""
				app.seleccionB = ""
				app.estado = false
			}

		},
		reset(){
			this.estado =  false
			this.tabla =  {}
			this.correctas =  []
			this.intentos =  0
			this.seleccionA =  ""
			this.seleccionB =  ""
			this.crearTabla()
		},
		crearTabla(){
			const NumeroParejas = this["tarjetasN"+ this.routeId]
			let usedCards = []
			const tarjetas = this.imagenes.length

			for (let i=0; i < NumeroParejas; i++) {

				let acceptCardKey = true

				while (acceptCardKey){

					let randomCard = Math.floor((Math.random() * tarjetas))

					if (usedCards.find(x => x === randomCard) == undefined) {
						usedCards.push(randomCard)
						usedCards.push(randomCard)

						acceptCardKey = false
					}
				}
			}
			this.tabla = usedCards.sort(() => 0.5 - Math.random())
		}

	},
	computed:{
		tablaFinal: function (){
			let app = this
			let ordered = {}
			Object.keys(app.tabla).sort(function(){return 0.5 - Math.random()}).forEach(function(key) {
				ordered[key] = app.tabla[key];
			});
			return ordered
		},
		routeId(){
			return this.$route.params.id
		},
		intentosLeft(){
			let tarjetas = this['tarjetasN'+ this.routeId]
			return (tarjetas + this.maxIntentos) - this.intentos
		},
		storeNivel(){
			return parseInt(this.$store.state.nivel)
		}
	},
	mounted(){
		this.crearTabla()
		// this.$router.push({name:'instrucciones'})
	}
}
</script>

<style lang="sass">

@import "../../../node_modules/bourbon/core/bourbon"

img
	display: block
	width: 100%

.juego
	// background-image: url("img/fondo.jpg")
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	background-position: center

.tablero
	display: flex
	flex-wrap: wrap
	padding: 25px
	max-width: 900px
	flex-shrink: 0

.ficha
	margin: 5px
	cursor: pointer
	transition: opacity 0.3s ease-in-out
	perspective: 800px


.nivel1
	max-width: 900px
	.ficha
		width: calc(20% - 10px)

.nivel2, .nivel3
	max-width: 600px
	.ficha
		width: calc(25% - 10px)

	
.abierta,.correcta
	pointer-events: none
	.ficha-contenedor
		transform: rotateY(180deg)
	.lado-a
		opacity: 0

.correcta
	opacity: 0.5

.null
	pointer-events: none

.ficha-contenedor
	+size(100%)
	transform: rotateY(0deg)
	transition: transform 500ms ease-in-out
	position: relative

.lado-a
	position: relative
	transition: opacity 0s ease-in-out 250ms	

.lado-b
	transform: rotateY(180deg)
	+position(absolute,0 null null 0)
	
.marcador
	display: flex
	h2
		margin: 0 20px


.marcador__nivel, .marcador__intentos
	display: flex
	align-items: flex-end
	justify-content: center
	h1,h4
		display: block
		margin: 0
		line-height: 1em
	h4
		margin-right: 15px


</style>
