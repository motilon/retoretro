import Vue from 'vue'
import router from './router'
import { store } from './store/store'
import App from './App.vue'

import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
