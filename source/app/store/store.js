import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		axios: axios,
		usuario: null,
		nombre: null,
		email: null,
		nivel: null
	},
	mutations: {
		storeUsuario: (state, val) => {
			state.usuario = val
		},
		storeEmail: (state, val) => {
			state.email = val
		},
		storeNivel: (state, val) => {
			state.nivel = val
		},
		storeNombre: (state, val) => {
			state.nombre = val
		},
	},
	actions: {
	},
	getters: {
	}
})

export default store