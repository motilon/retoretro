<template lang="pug">

#registro.registro

	router-view

	.registro__header
		h4 Ingresa los siguientes datos para participar

	.registro__formulario
		.input-container(:class="{'danger-state': $v.eMail.$error,'success-state': !$v.eMail.$invalid}")
			input(
				type="text"
				placeholder="E-mail"
				v-model="eMail"
				@blur="$v.eMail.$touch"
			)
			.input-feedback(v-if="$v.eMail.$error")
				span.requerido(v-if="$v.eMail.$model === ''") El campo email es obligatorio
				span.error(v-else) Escribe un E-mail valido

		.input-container(:class="{'danger-state': $v.nombre.$error,'success-state': !$v.nombre.$invalid}")
			input(
				type="text"
				placeholder="Nombre completo"
				v-model="nombre"
				@blur="$v.nombre.$touch"
				@input="$v.nombre.$touch"
			)
			.input-feedback(v-if="$v.nombre.$error")
				span.requerido(v-if="$v.nombre.$model === ''") El campo nombre es obligatorio
				span.error(v-else) Escribe un nombre valido

	.registro__action
		a.boton(
			:class="{'boton-inactivo': $v.$error || !$v.$dirty}"
			@click="registrar()"
		) 
			h6 Jugar
		
		router-link(:to="{name:'terminos'}") Términos y condiciones

</template>

<script>
import { required, email, helpers } from 'vuelidate/lib/validators'

const alphaNumeric = helpers.regex('alpha', /^[a-zA-Z áéíóúÁÉÍÓÚñÑ]*$/)

export default {
	name: 'Registro',
	components: {},
	data(){
		return{
			nombre: "",
			eMail: "",
			datos: null
		}
	},
	watch: {
		usuario(val){
			if(val){
				this.continuar()
			}
		}
	},
	validations: {
    nombre: {
			required,
			alphaNumeric
    },
    eMail: {
			required,
      email
    }
  },
	methods:{
		registrar(){
			console.log(this.$v)

		this.axios({
			method: 'post',
			url: 'https://stirpe.co/retoretro/ajax/save.php',
			data: {
				name: this.nombre,
				email: this.eMail
			}
		})
			.then( response => {
				console.log(response.data)

				if(response.data.bono > 0) {
					alert('El correo ingresado ya gano un bono del ' + response.data.bono + '%');
					location.href = '/retoretro';
				} else {
					this.$store.commit('storeUsuario', response.data.id)
					this.$store.commit('storeEmail', this.eMail)
					this.$store.commit('storeNombre', this.nombre)
					this.$store.commit('storeNivel', response.data.bono == 0 ? 1 : 0)
				}
			})
			.catch( error => {
				console.log(error)
			})
		},
		continuar(){
			this.$router.push({ name: 'juego',params: {id: 1} })
		}
	},
	computed:{
		axios(){
			return this.$store.state.axios
		},
		usuario(){
			return this.$store.state.usuario
		}
	},
	created(){},
	mounted(){}
}
</script>

<style lang="sass">
.registro
	max-width: 90%

.registro__header
	h4
		text-align: center
		color: #03A9F4


.registro__formulario
	input[type="text"]
		line-height: 1em
		border: none
		border-radius: 0
		background: transparent
		box-shadow: none
		border-bottom: 3px solid white
		color: white
		padding: 0
		margin: 0
		margin-bottom: 5px

.input-container
	margin-bottom: 25px

.boton-inactivo
	opacity: 0.3
	pointer-events: none

.registro__action
	display: flex
	flex-direction: column
	align-items: center

	a
		margin-bottom: 15px
</style>