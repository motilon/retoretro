<template lang="pug">

#modal.modal
	.modal__container
		a.modal__close(@click="$router.back()")

		.terminos(v-if="$route.name === 'terminos'")
			h3 Términos y condiciones juego el reto retro
			p 1. RESPONSABLE DE LA ACTIVIDAD.
				|<br>	La actividad comercial denominada “El Reto Retro”, en adelante la “Actividad”, es realizada por la empresa BAGUER S.A.S., identificada con el NIT. 804.006.601-0 y domiciliada en la ciudad de Giron (Santander), en adelante la “Compañía”.
				|<br>	2. VIGENCIA DEL JUEGO.
				|<br>	La Actividad iniciará el día lunes 8 de abril de 2019 a las 12:00 m y finalizará el día domingo 30 de abril de 2019 a las 11:59 pm.
				|<br>	3. VIGENCIA DE REDENCIÓN.
				|<br>	El premio tendrá vigencia de redención del día martes 9 de abril de 2019 a las 12:00 m y finalizará el día domingo 5 de mayo de 2019 a las 11:59 p.m.
				|<br>	4. ÁMBITO DE APLICACIÓN.
				|<br>	La Actividad es válida para todas las tiendas Stirpe, Travel, Unser, Equis, U82 del país y Tienda Online www.stirpe.co
				|<br>	5. REQUISITOS PARA PARTICIPAR.
				|<br>			5.1. Ser mayor de edad
				|<br>			5.2. El participante deberá contar con un dispositivo inteligente (Smartphone, Tablet, pc) con acceso a internet para acceder al juego a través de la URL: www.stirpe.co/juego
				|<br>	6. MECÁNICA DEL CONCURSO.
				|<br>			6.1. Descripción general
				|<br>			A partir del 8 de abril de 2019 a las 12:00 m, y hasta el 30 de abril de 2019 a las 11:59 p.m., la Compañía comunicará a través de las redes de la marca, pauta online, mailing y SMS, la siguiente URL www.stirpe.co/juego, que llevará a un juego, el cual consiste en logra formar las parejas idénticas en (3) niveles y descubrir los descuentos del 5,10 y 15%, cada uno en treinta (30) segundos de duración. Mientras más niveles se logren completar, mejores descuentos se obtendrán.
				|<br>			Una vez culminados los cinco (3) niveles del juego, finalizará el juego y mostrará el premio obtenido de acuerdo al número de niveles completados, siempre y cuando el participante logre completar al menos un nivel. 
				|<br>	Un (01) nivel: 5% de descuento*
				|<br>	Dos (02) niveles: 10% de descuento*
				|<br>	Tres (03) niveles: 15% de descuento*
				|<br>			*El descuento aplica para cualquier prenda de vestir de las tiendas.
				|<br>			Una vez el participante termine la partida, le aparecerá un mensaje del premio que ganó, y un código con el cual podrá redimir el descuento tanto en tienda física (Presentando el código en caja) como en tienda online (Ingresando el código en el carrito de compras).
				|<br>			El participante tendrá un (01) intento para participar en el juego.
				|<br>	7. ACEPTACIÓN DEL REGLAMENTO/EXIMENTES DE RESPONSABILIDAD.
				|<br>	El simple hecho de participar en la Actividad implica la total aceptación de los presentes términos y condiciones. En caso de identificarse fraude o datos erróneos, la Compañía puede descalificar al (los) participante(s) y/o cancelar la Actividad. El titular y/o participante es el único responsable de cualquier acción, reclamación o solicitud que se presente ante la Compañía, como resultado de su participación en el juego. La Compañía podrá tomar la decisión de descalificar a alguno de los participantes de esta Actividad en caso de detectar alguna acción fraudulenta previa motivación de su acto de descalificación. La Compañía se reserva el derecho de eliminar del sitio cualquier material que considere inadecuado, derecho éste que podrá ejercer en cualquier momento.

		.instrucciones(v-else)
			h3 Instrucciones
			p ¡Logra formar las parejas idénticas y descubre los descuentos que tenemos para ti!

</template>

<script>
export default {
	name: "Modal",
	data(){
		return{
		}
	},
	methods:{
		ruta(){
			console.log(this.$route)
		}
	}
}
</script>

<style lang="sass">
.modal
	position: fixed
	top: 0
	right: 0
	bottom: 0
	left: 0

	display: flex
	justify-content: center
	align-items: center

	z-index: 10000

	&:before
		content: ''
		display: block
		position: absolute
		top: 0
		right: 0
		bottom: 0
		left: 0
		background-color: rgba(0,0,0,0.95)

.modal__container
	position: relative
	background-color: #0b0626
	border: 3px solid white
	padding: 50px
	max-width: 90%
	max-height: 100vh
	overflow-y: auto
	p
		font-size: 1rem
		color: white

.modal__close
	display: block
	height: 20px
	width: 20px
	background-image: url('img/close.svg')

	position: absolute
	right: 10px
	top: 10px
	cursor: pointer


</style>
