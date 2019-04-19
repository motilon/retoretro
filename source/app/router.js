import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Juego from './components/Juego'
import Registro from './views/Registro'
import Resultados from './views/Resultados'
import Modal from './components/Modal'

import store from './store/store'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/registro',
			name: 'registro',
			component: Registro,
			children:[
				{
					path: 'terminos',
					name: 'terminos',
					component: Modal
				},
			]
		},
		{
			path: '/juego/:id',
			name: 'juego',
			component: Juego,
			children:[
				{
					path: 'instrucciones',
					name: 'instrucciones',
					component: Modal
				},
			],
			beforeEnter: (to, from, next) => {
				if(store.state.usuario){
					next()
				} else {
					next('/')
				}
			}
		},
		{
			path: '/r/:resultado?',
			name: 'resultados',
			component: Resultados,
			beforeEnter: (to, from, next) => {
				if(store.state.usuario){
					next()
				} else {
					next('/')
				}
			}
		}
	]
})
