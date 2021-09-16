import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import router from "@/router";
import { dollarFilter } from "@/filters";

// Para que funcione el filtro uso .filter()
// le paso nombre del filtro y la funcion que se va a ejecutar cuando llame ese filtro
Vue.filter("dollar", dollarFilter);
Vue.config.productionTip = false;

new Vue({
  router: router,
  render: (h) => h(App),
}).$mount("#app");
